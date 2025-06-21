import { useCallback } from "react";

export function useMask() {
  const maskCpf = useCallback((cpf?: string): string => {
    const digits = cpf?.replace(/\D/g, "") || "";
    const padded = digits.padStart(11, "0");
    const part1 = padded.slice(0, 3);
    const part4 = padded.slice(-2);
    return `${part1}.***.***-${part4}`;
  }, []);

  const maskCnpj = useCallback((cnpj?: string): string => {
    const digits = cnpj?.replace(/\D/g, "") || "";
    const padded = digits.padStart(14, "0");
    const part1 = padded.slice(0, 2);
    const part4 = padded.slice(-2);
    return `${part1}.***.***/****-${part4}`;
  }, []);

  const maskPhone = useCallback((phone?: string): string => {
    const digits = phone?.replace(/\D/g, "") || "";
    const padded = digits.padStart(11, "0");
    const area = padded.slice(0, 2);
    const firstPart = padded.slice(2, 7);
    const secondPart = padded.slice(7, 11);
    return `(${area})${firstPart}-${secondPart}`;
  }, []);

  return {
    maskCpf,
    maskCnpj,
    maskPhone,
  };
}
