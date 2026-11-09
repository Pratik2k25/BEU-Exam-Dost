(()=>{
  const form = document.querySelector('[data-early-access]');
  if (!form) return;
  const message = form.querySelector('[data-form-message]');
  const button = form.querySelector('button[type="submit"]');
  const defaultButtonText = button.innerHTML;
  const setStatus = (type,text) => { message.dataset.state=type; message.textContent=text; };
  form.addEventListener('submit', async (event)=>{
    event.preventDefault();
    if(!form.reportValidity()) return;
    button.disabled=true;
    button.textContent='Sending your request…';
    setStatus('info','');
    const body={
      name:form.elements.name.value.trim(),
      email:form.elements.email.value.trim(),
      website:document.body.dataset.website,
      consent:form.elements.consent.checked,
      website_url:form.elements.website_url.value // honeypot
    };
    try{
      const url=window.BEU_TELEGRAM_SIGNUP_ENDPOINT || '/api/early-access';
      const resp=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
      let result={};try{result=await resp.json()}catch{}
      if(!resp.ok || result.ok!==true)throw new Error(result.error || 'We could not send your request. Please try again.');
      setStatus('success','Request received! We’ll use your email to contact you about updates or an early preview.');
      form.reset();
    }catch(error){
      const detail=error?.message || '';
      setStatus('error',detail==='Failed to fetch'?'Could not reach the signup service. Please try again later.':detail||'Could not send your request. Please try again.');
    }finally{button.disabled=false;button.innerHTML=defaultButtonText;}
  });
})();
