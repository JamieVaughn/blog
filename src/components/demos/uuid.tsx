export function Uuid() {
  const genUUID = (event) => {
    let url = URL.createObjectURL(new Blob());
    event.currentTarget.querySelector('.my-uuid').innerText = url.split('/')[3];
    URL.revokeObjectURL(url);
}
  return (
      <button onClick={genUUID} style={{padding: '1rem', border: '1px solid silver', width: '620px' }}>
        Click to Generate a UUID:  
        <br />
        <span class='my-uuid' style={{fontWeight: 'bold', fontSize: '18px'}}>...</span>
      </button>
    )
}
