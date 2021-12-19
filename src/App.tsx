import React from 'react';
function App(){ 
  return(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        // background: 'rgb(251,251,251)',
        background: 'linear-gradient(146deg, rgba(251,251,251,1) 0%, rgba(209,209,209,1) 100%)',
        zIndex: -100,
      }}>
    </div>
  );
}

export default App;
