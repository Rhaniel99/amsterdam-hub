import React, { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FormContainer, InputArea, Input, Label, Button } from "./Form.styles";

const Form = ({ onEdit, getTools }) => {
  const ref = useRef();
  // useEffect(() => {
  // })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tool = ref.current;
    if (
      !tool.nome.value ||
      !tool.desc.value ||
      !tool.iconUrl.files[0] ||
      !tool.color.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const formData = new FormData();
    formData.append("name", tool.nome.value);
    formData.append("desc", tool.desc.value);
    formData.append("iconUrl", tool.iconUrl.files[0]);
    formData.append("color", tool.color.value);

    await axios
      .post("http://localhost:6060/api/app/reg-tools", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => toast.success(data.msg))
      .catch(({ data }) => toast.error(data.msg));
      // Para limpar
    tool.nome.value = "";
    tool.desc.value = "";
    tool.iconUrl.value = null;
    tool.color.value = "";
    getTools();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome:</Label>
        <Input name="nome" type="text" />
      </InputArea>
      <InputArea>
        <Label>Descrição:</Label>
        <Input name="desc" type="text" />
      </InputArea>
      <InputArea>
        <Label>Icone:</Label>
        <Input name="iconUrl" type="file" />
      </InputArea>
      <InputArea>
        <Label>Cor:</Label>
        <Input name="color" type="text" />
      </InputArea>
      <Button type="submit">Salvar</Button>
    </FormContainer>
  );
};

export default Form;
