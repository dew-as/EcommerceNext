export default function TileComponent({ data, selected = [], onClick }) {
  return data && data.length ? (
    <div className="mt-3 flex flex-wrap items-center gap-1">
      {data.map((dataItem) => (
        <label className="cursor pointer" key={dataItem.id}>
            <span className="rounded-lg border border-black py-2 px-6 font-bold">
                {dataItem.label}
            </span>
        </label>
      ))}
    </div>
  ) : null;
}
