import { BigDecimal } from "@graphprotocol/graph-ts";
import {
  CreateVault as CreateVaultEvent,
  DecreaseVaultColl as DecreaseVaultCollEvent,
  DecreaseVaultDebt as DecreaseVaultDebtEvent,
  IncreaseVaultColl as IncreaseVaultCollEvent,
  IncreaseVaultDebt as IncreaseVaultDebtEvent,
  Liquidate as LiquidateEvent
} from "../generated/VaultManager/VaultManager";
import { DECIMALS } from "./constants";
import { Vault } from "../generated/schema";
import { getVaultSchemaID, scale } from "./utils";

export function handleCreateVault(event: CreateVaultEvent): void {
  let entity = new Vault(getVaultSchemaID(event.params.owner.toHexString(), event.params.vaultId));

  entity.owner = event.params.owner;
  entity.debt = BigDecimal.fromString("0");
  entity.coll = scale(event.params.coll, DECIMALS);
  entity.lastDebtRebaseIndex = event.params.dri;
  entity.lastCollRebaseIndex = event.params.cri;
  entity.isActive = true;

  entity.save();
}

export function handleDecreaseVaultColl(event: DecreaseVaultCollEvent): void {
  let entity = Vault.load(getVaultSchemaID(event.params.owner.toHexString(), event.params.vaultId));

  if (!entity) return;

  entity.coll = entity.coll.minus(scale(event.params.coll, DECIMALS));
  entity.lastDebtRebaseIndex = event.params.dri;
  entity.lastCollRebaseIndex = event.params.cri;

  entity.save();
}

export function handleDecreaseVaultDebt(event: DecreaseVaultDebtEvent): void {
  let entity = Vault.load(getVaultSchemaID(event.params.owner.toHexString(), event.params.vaultId));

  if (!entity) return;

  entity.debt = entity.debt.minus(scale(event.params.debt, DECIMALS));
  entity.lastDebtRebaseIndex = event.params.dri;
  entity.lastCollRebaseIndex = event.params.cri;

  entity.save();
}

export function handleIncreaseVaultColl(event: IncreaseVaultCollEvent): void {
  let entity = Vault.load(getVaultSchemaID(event.params.owner.toHexString(), event.params.vaultId));

  if (!entity) return;

  entity.coll = entity.coll.plus(scale(event.params.coll, DECIMALS));
  entity.lastDebtRebaseIndex = event.params.dri;
  entity.lastCollRebaseIndex = event.params.cri;

  entity.save();
}

export function handleIncreaseVaultDebt(event: IncreaseVaultDebtEvent): void {
  let entity = Vault.load(getVaultSchemaID(event.params.owner.toHexString(), event.params.vaultId));

  if (!entity) return;

  entity.debt = entity.debt.plus(scale(event.params.debt, DECIMALS));
  entity.lastDebtRebaseIndex = event.params.dri;
  entity.lastCollRebaseIndex = event.params.cri;

  entity.save();
}

export function handleLiquidate(event: LiquidateEvent): void {
  let entity = Vault.load(getVaultSchemaID(event.params.owner.toHexString(), event.params.vaultId));

  if (!entity) return;

  entity.isActive = false;

  entity.save();
}
