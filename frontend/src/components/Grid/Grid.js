import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "./Grid.styles";

const Grid = ({ tools }) => {
    const handleAddCircleClick = async (itemId) => {
        try {
            // await axios.post(`http://localhost:6060/api/app/get-shorts/${itemId}`);
            // console.log(itemId);
            const res = await axios.get(`http://localhost:6060/api/app/get-shorts/${itemId}`);
            console.log(itemId);
            // setTools(res.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
            // A requisição foi bem-sucedida, você pode exibir uma mensagem de sucesso ou atualizar a lista de itens se necessário
        } catch (error) {
            // Se houver algum erro na requisição, você pode exibir uma mensagem de erro ou lidar com isso de outra maneira
            console.error("Erro ao adicionar círculo:", error);
        }
    };

    return(
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Descrição</Th>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th> 
                </Tr>
            </Thead>
            <Tbody>
                {tools.map((item, i) => (
                    <Tr key={i}>
                        <Td width="20%">{item.name}</Td>
                        <Td width="60%">{item.desc}</Td>
                        <Td style={{ textAlign: "center" }} width="5%">
                            <FaEdit/>
                        </Td>
                        <Td style={{ textAlign: "center" }} width="5%">
                            <FaTrash/>
                        </Td>
                        <Td style={{ textAlign: "center" }} width="5%">
                            <IoIosAddCircle onClick={() => handleAddCircleClick(item.id)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;
