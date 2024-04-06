export default function MixBlendMode() {
  const resetBG = () => {
    (document.querySelector('#mix-blend-mode header') as HTMLElement)
      ?.style.setProperty('background-image', 'none');
  };
  const pickColor = (e: any) => {
    // document.querySelector('#picker').addEventListener('change', function(e) {

    // document.querySelector('header').style.setProperty('background-image', 'none');
    resetBG();
    (document.querySelector('#mix-blend-mode header') as HTMLElement)
      ?.style.setProperty('background-color', e.target.value);
  };
  const toggleColor = (e: any) => {
    resetBG();
    (document.querySelector('#mix-blend-mode header') as HTMLElement)
      ?.style.setProperty('background-color', ['#eee', '#222'][Number(e.target.value)]);
  };
  const selectBG = (e: any) => {
    (document.querySelector('#mix-blend-mode header') as HTMLElement)
      ?.style.setProperty('background-image', `url(${e.target.value})`);
  };

  return (
    <div id="mix-blend-mode">
        <label for="picker">Choose Background Color: </label>
      <input id="picker" type="color" onInput={pickColor} />
        <br />
        <label for="toggle">Toggle Background Color to White/Black: </label>
      <input id="toggle" type="range" min="0" max="1" step="1" onInput={toggleColor} />
      <br />
      <label for="select-img">Choose Background Image: </label>
      <select id="select-img" name="bg-image" onInput={selectBG}>
        <option disabled selected>
          Select Image
        </option>
        <option value="https://images.unsplash.com/photo-1485949870685-e1d7ea5a1c53?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80">
          Stratospheric
        </option>
        <option value="https://images.unsplash.com/photo-1445905595283-21f8ae8a33d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80">
          Celestial
        </option>
        <option value="https://images.unsplash.com/photo-1604599340287-2042e85a3802?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80">
          Underwater
        </option>

        <option value="https://images.unsplash.com/photo-1429734956993-8a9b0555e122?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1079&q=80">
          Sunset
        </option>
        <option value="https://images.unsplash.com/photo-1517913174253-45ab9b0f8b21?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1236&q=80">
          Crosswalk
        </option>
        <option value="https://images.unsplash.com/photo-1616067064617-31a11565509d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80">
          Oil Slick
        </option>
      </select>
      <br />
      <br />
      <header>
        <h1>
          Hello
          <span>Mix Blend Mode!</span>
          <svg viewBox="0 0 1000 80" xmlns="http://www.w3.org/2000/svg">
            <text x="25" y="50" fill="white" font-size="48px">
              Thanks CSS!
            </text>
          </svg>
        </h1>
      </header>
      <style>
      {`
  #mix-blend-mode header {
    background-color: indigo;
    background-position: center bottom;
    min-height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #mix-blend-mode h1 {
    text-align: center;
    font-size: 3rem;
    color: white;
    mix-blend-mode: difference;
  }

  #mix-blend-mode h1 span {
  /*   filter: grayscale(100%);   */
  }


  #mix-blend-mode input[type=range] {
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    width: 50px; /* Specific width is required for Firefox. */
    height: 26px;
    vertical-align: middle;
    background: transparent;
  }

  #mix-blend-mode input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  #mix-blend-mode input[type=range]:focus {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  }
  /* Special styling for WebKit/Blink */
  #mix-blend-mode input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1px solid #3071a9;
    height: 25px;
    width: 25px;
    border-radius: 100%;
    background: #ffffff;
    cursor: pointer;
    margin-top: -1px;
  }

  /* All the same stuff for Firefox */
  #mix-blend-mode input[type=range]::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #3071a9;
    height: 25px;
    width: 25px;
    border-radius: 100%;
    background: #ffffff;
    cursor: pointer;
  }
  #mix-blend-mode input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 25px;
    cursor: pointer;
    background: #3071a9;
    border-radius: 25px;
    border: 1px solid royalblue;
  }

  #mix-blend-mode input[value="0"] {
    background: royalblue;
  }
  #mix-blend-mode input[value="1"] {
    background: cyan;
  }

  #mix-blend-mode input[type=range]:focus::-webkit-slider-runnable-track {
    background: #367ebd;
  /*   outline: 1px solid pink; */
  }

  #mix-blend-mode input[type=range]::-moz-range-track {
    width: 100%;
    height: 25px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #3071a9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }`}
      </style>
    </div>
  );
}
