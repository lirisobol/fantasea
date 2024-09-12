export default function LoaderBar():JSX.Element {
    return (
      <div>
        <div aria-hidden="true">
          <div className="overflow-hidden rounded-full bg-gray-200">
            <div style={{ width: '37.5%' }} className="h-1 rounded-full bg-teal-400" />
          </div>
        </div>
      </div>
    )
  }