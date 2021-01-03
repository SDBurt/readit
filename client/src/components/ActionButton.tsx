export default function ActionButton({children}) {
    return (
        <div className="px-2 py-1 mr-1 text-xs text-gray-500 rounded cursor-pointer hover:bg-gray-200">
            {children}
        </div>
    )
  }