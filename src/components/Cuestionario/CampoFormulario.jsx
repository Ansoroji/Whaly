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
  maxLength,
  inputMode,
  helperText,
  error,
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
        maxLength={maxLength}
        inputMode={inputMode}
        aria-invalid={Boolean(error)}
        aria-describedby={
          helperText || error
            ? `${name}-description`
            : undefined
        }
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

      {(error || helperText) && (
        <Text
          id={`${name}-description`}
          color={error ? "red.700" : "var(--whaly-purple)"}
          fontSize="13px"
          role={error ? "status" : undefined}
        >
          {error || helperText}
        </Text>
      )}

    </Stack>
  );

}


export default CampoFormulario;