
const ListMenu = ({children}: {children: React.ReactNode}) => {
    return <div className="flex flex-col gap-1">{children}</div>;
}
const ListGroup = () => {
    
}
const ListItem = ({children, level = 0}: {children: React.ReactNode, level?: number}) => {
    return <div className="flex gap-1 py-1 px-2 hover:bg-slate-500 dark:hover:bg-gray-600 rounded-sm">
        {children}
    </div>;
}
export {ListMenu, ListGroup, ListItem}