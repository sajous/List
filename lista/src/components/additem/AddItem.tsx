import { useCallback, useEffect, useState } from "react"
import { ApiExcepition } from "../../service/api/ApiException";
import { ITarefa, TarefasService } from "../../service/tarefas/TarefasService";
import { AddArea, Button, Table } from "./Styled"




export const Additem = () => {
const [item, setItem] = useState<ITarefa[]>([])
useEffect(()=>{
    TarefasService.getAll()
    .then((result) => {
        if(result instanceof ApiExcepition){
            alert(result.message)
        }else{
            setItem(result)
        }

    })
},[])

const KeyDown :React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) =>{
   if(e.key === 'Enter'){
        if(e.currentTarget.value.trim().length === 0)return;

        const value = e.currentTarget.value;
        e.currentTarget.value = '';

        if(item.some((item) => item.title === value)) return;

        TarefasService.create({title: value, state: false,})
        .then((result) => {
            if(result instanceof ApiExcepition){
                alert(result.message)
            }else{
                setItem((olditem) => {
                    return [ ...olditem,result];
             });
            }
    
        })
    }
  }, [item]);  

const HandleToggleComplete = useCallback((id: number) => {
    const tarefaToUpdate = item.find((tarefa) => tarefa.id === id)
    if(!tarefaToUpdate) return;  
    TarefasService.updateById(id,{
        ...tarefaToUpdate,
        state: !tarefaToUpdate.state,
    })
    .then((result)=>{
        if(result instanceof ApiExcepition){
            alert(result.message)
        }else{
            setItem((oldlistitem) => {
                return oldlistitem.map(oldlistitem => {
                    if (oldlistitem.id === id) return result;
                    return oldlistitem;
                });
            });
         }
      });
},[item]);

const HandleDelete = useCallback((id: number) => {  
    TarefasService.deleteById(id)
    .then((result)=>{
        if(result instanceof ApiExcepition){
            alert(result.message)
        }else{
            setItem((oldlistitem) => {
                return oldlistitem.filter(oldlistitem =>oldlistitem.id !== id);
            });
         }
      });
},[]);
    return(
    <div>
    <AddArea onKeyDown={KeyDown}></AddArea>
    <Button>➕</Button>
    <p>{item.filter((listitem) => listitem.state).length}</p>
    <Table>
        <ul>
            {item.map((listitem) => {
                return <li key={listitem.id}>
                    <input 
                    type="checkbox"
                    checked={listitem.state} 
                    onChange={() => HandleToggleComplete(listitem.id)}
                    />
                    {listitem.title}
                    <button  onClick={() => HandleDelete(listitem.id)}>Apagar</button>
                </li>
            })}
        </ul>
    </Table>
    </div>
       
   )
    }
