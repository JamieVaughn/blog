export default function UuidDemo() {
  const genUUID = (event: MouseEvent) => {
    let url = URL.createObjectURL(new Blob());
    const span: HTMLSpanElement | null = (event.currentTarget as HTMLSpanElement).querySelector('.my-uuid')
    if(span) span.innerText = url.split('/')[3];
    (document.querySelector('.copy-uuid') as HTMLElement).dataset.uuid = url.split('/')[3];
    URL.revokeObjectURL(url);
}
  return (
    <div>
      <style>{`.copy-uuid {
        cursor: pointer;
        border-radius: 8px;
        padding: 8px;
        user-select: none;
      }
      .copy-uuid:active {
        background-color: lightgray;
      }
      `}</style>
      <button onClick={genUUID} style="padding: 1rem; border: 1px solid silver; width: 620px">
        Click to Generate a UUID:  
        <br />
        <span class='my-uuid' style="font-weight: bold; font-size: 18px;">...</span>
      </button>
      <br />
      <small class='copy-uuid' onClick={(e: MouseEvent) => e.target instanceof HTMLElement && navigator.clipboard.writeText(e.target.dataset?.uuid ?? '')} data-uuid=''>Copy UUID</small>
    </div>
    )
}
