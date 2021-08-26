async function waitAndMaybeReject() {
    // Wait one second
    await new Promise(r => setTimeout(r, 1000));
    // Toss a coin
    const isHeads = Boolean(Math.round(Math.random()));
  
    if (isHeads) return 'yay';
    throw new Error('Boo!');
  }
  
  async function myFunctionThatCatches() {
      try {
          
          const value = await waitAndMaybeReject(); // <-- Notice we added here the "await" keyword.
          console.log("what is value", value);
          console.log("type of", typeof value);


          return value
      } catch (e) {
          console.error(e.message);
      } finally {
          console.log('We do cleanup here');
      }
      return "Nothing found";
  }
  
  async function run() {
      const myValue = await myFunctionThatCatches();
      console.log("show value here", myValue);
  }
  
  run();