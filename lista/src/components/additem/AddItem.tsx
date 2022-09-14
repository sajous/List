import { useCallback, useState } from "react"
import { AddArea, Button } from "./Styled"


interface IList {
    id : number;
    title : string;
    state : boolean;
}

export const Additem = () => {
const [item, setItem] = useState<IList[]>([])

const KeyDown :React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) =>{
    if(e.key === 'Enter'){
        if(e.currentTarget.value.trim().length === 0) return;
        const value = e.currentTarget.value;
        e.currentTarget.value = '';
        setItem((olditem) =>{
            if (olditem.some(item)=> item.title === value)) return olditem;
            return [...olditem, {
                id : 1,
                title : value,
                state : false,
            }];
        });
    }
},[]);
   
    return(
    <div>
    <AddArea onKeyDown={KeyDown}></AddArea>
    <Button>➕</Button>
    </div>
       
   )
}