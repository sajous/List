import { Additem } from "../../components/additem/AddItem"
import { Container, Titulo } from "./Styled"




export const Home = () => {
    return (
        
        <Container>
        <Titulo>Minha Lista</Titulo>
        <Additem />
        </Container>
    )

}