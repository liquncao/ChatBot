// Escape untrusted text before applying a deliberately small formatting subset.
export function formatReply(value) {
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const inline=s=>escape(s).replace(/\*\*([^*\n]+)\*\*/g,'<strong>$1</strong>');
  const lines=String(value).split(/\r?\n/);let html='',list=null;
  const close=()=>{if(list){html+='</'+list+'>';list=null;}};
  for(const line of lines){
    const s=line.trim();if(!s){close();continue;}
    const bullet=s.match(/^[-*•]\s+(.+)$/);const numbered=s.match(/^\d+[.)]\s+(.+)$/);
    const kind=bullet?'ul':numbered?'ol':null;
    if(kind){if(list!==kind){close();list=kind;html+='<'+kind+'>';}html+='<li>'+inline((bullet||numbered)[1])+'</li>';}
    else{close();html+='<p>'+inline(s)+'</p>';}
  }
  close();return html;
}
