(async ()=>{
  try{
    const res = await fetch('http://localhost:5000/api/tenders/68b2ad339901a8f810300102');
    console.log('status', res.status);
    console.log(await res.text());
  }catch(e){
    console.error(e);
  }
})();
