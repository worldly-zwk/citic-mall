import { enumToOptions } from "@/utils";

export enum InvoiceTypeEnum {
  ORDINARY,
  ELECTRONIC,
  PROFESSIONAL,
}

export enum InvoiceNameEnum {
  PERSONAL,
  COMPANY,
}

export enum InvoiceContentEnum {
  DETAIL,
  NULL,
}

export const INVOICE_TYPE_ENUM = new Map([
  [InvoiceTypeEnum.ORDINARY, '纸质普票'],
  [InvoiceTypeEnum.ELECTRONIC, '电子普票'],
  [InvoiceTypeEnum.PROFESSIONAL, '增值专票'],
]);

export const INVOICE_TYPE_OPTIONS = enumToOptions(INVOICE_TYPE_ENUM);

export const INVOICE_NAME_ENUM = new Map([
  [InvoiceNameEnum.PERSONAL, '个人'],
  [InvoiceNameEnum.COMPANY, '单位'],
]);

export const INVOICE_NAME_OPTIONS = enumToOptions(INVOICE_NAME_ENUM);

export const INVOICE_CONTENT_ENUM = new Map([
  [InvoiceContentEnum.DETAIL, '明细'],
  [InvoiceContentEnum.NULL, '不开发票']
]);

export const INVOICE_CONTENT_OPTIONS = enumToOptions(INVOICE_CONTENT_ENUM);
