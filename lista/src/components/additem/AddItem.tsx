import { useCallback, useState } from "react"
import { AddArea, Button, Table } from "./Styled"


interface IList {
    id : number;
    title : string;
    state : boolean;
}

export const Additem = () => {
const [item, setItem] = useState<IList[]>([])

const KeyDown :React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) =>{
   if(e.key === 'Enter'){
        if(e.currentTarget.value.trim().length === 0)return;

        const value = e.currentTarget.value;

        setItem((olditem) => {
            if(olditem.some((item) => item.title === value)) return olditem;
            return [ ...olditem, {
                id: 1,
                title: value,
                state: false,
            }
        ];
     });
    }
  }, []);  
   
    return(
    <div>
    <AddArea onKeyDown={KeyDown}></AddArea>
    <Button>➕</Button>
    <p>{item.filter((listitem) => listitem.state).length}</p>
    <Table>
        <ul>
            {item.map((listitem) => {
                return <li key={listitem.title}>
                    <input 
                    type="checkbox"
                    checked={listitem.state} 
                    onChange={() => {
                        setItem((olditem) => {
                            return olditem.map(oldlistitem => {
                                const newstate = oldlistitem.title === listitem.title
                                ? !oldlistitem.state
                                : oldlistitem.state;
                                return {
                                    ...oldlistitem, state: newstate,
                                }
                            })
                        })
                    }}
                    />
                    {listitem.title}
                </li>
            })}
        </ul>
    </Table>
    </div>
       
   )
    }
