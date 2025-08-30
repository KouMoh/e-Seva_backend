(() => {
  const BACKEND_BASE = process.env.BACKEND_BASE || 'http://localhost:5000';
  (async () => {
    try {
      const res = await fetch(`${BACKEND_BASE}/api/bids/68b2ad339901a8f810300102`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bidAmount: 12345, bidderName: 'Tester', documents: [] }),
      });
      console.log('status', res.status);
      console.log(await res.text());
    } catch (e) {
      console.error(e);
    }
  })();
})();
