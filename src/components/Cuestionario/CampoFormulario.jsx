import {
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";


function CampoFormulario({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  max,
}) {

  return (
    <Stack gap="8px">

      <Text
        as="label"
        htmlFor={name}
        color="var(--whaly-purple)"
        fontWeight="700"
      >
        {label}
      </Text>


      <Input
        id={name}
        name={name}
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        height="62px"
        border="2px solid var(--whaly-purple)"
        borderRadius="32px"
        px="24px"
        fontSize="17px"
        color="var(--whaly-purple)"
        _focus={{
          borderColor:
            "var(--whaly-purple)",
          boxShadow:
            "0 0 0 2px var(--whaly-mint)",
        }}
      />

    </Stack>
  );

}


export default CampoFormulario;