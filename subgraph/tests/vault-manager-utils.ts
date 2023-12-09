import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CreateVault,
  DecreaseVaultColl,
  DecreaseVaultDebt,
  IncreaseVaultColl,
  IncreaseVaultDebt,
  Liquidate,
  Redeem
} from "../generated/VaultManager/VaultManager"

export function createCreateVaultEvent(
  owner: Address,
  vaultId: BigInt,
  coll: BigInt,
  dri: BigInt,
  cri: BigInt
): CreateVault {
  let createVaultEvent = changetype<CreateVault>(newMockEvent())

  createVaultEvent.parameters = new Array()

  createVaultEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  createVaultEvent.parameters.push(
    new ethereum.EventParam(
      "vaultId",
      ethereum.Value.fromUnsignedBigInt(vaultId)
    )
  )
  createVaultEvent.parameters.push(
    new ethereum.EventParam("coll", ethereum.Value.fromUnsignedBigInt(coll))
  )
  createVaultEvent.parameters.push(
    new ethereum.EventParam("dri", ethereum.Value.fromUnsignedBigInt(dri))
  )
  createVaultEvent.parameters.push(
    new ethereum.EventParam("cri", ethereum.Value.fromUnsignedBigInt(cri))
  )

  return createVaultEvent
}

export function createDecreaseVaultCollEvent(
  owner: Address,
  vaultId: BigInt,
  coll: BigInt,
  dri: BigInt,
  cri: BigInt
): DecreaseVaultColl {
  let decreaseVaultCollEvent = changetype<DecreaseVaultColl>(newMockEvent())

  decreaseVaultCollEvent.parameters = new Array()

  decreaseVaultCollEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  decreaseVaultCollEvent.parameters.push(
    new ethereum.EventParam(
      "vaultId",
      ethereum.Value.fromUnsignedBigInt(vaultId)
    )
  )
  decreaseVaultCollEvent.parameters.push(
    new ethereum.EventParam("coll", ethereum.Value.fromUnsignedBigInt(coll))
  )
  decreaseVaultCollEvent.parameters.push(
    new ethereum.EventParam("dri", ethereum.Value.fromUnsignedBigInt(dri))
  )
  decreaseVaultCollEvent.parameters.push(
    new ethereum.EventParam("cri", ethereum.Value.fromUnsignedBigInt(cri))
  )

  return decreaseVaultCollEvent
}

export function createDecreaseVaultDebtEvent(
  owner: Address,
  vaultId: BigInt,
  debt: BigInt,
  dri: BigInt,
  cri: BigInt
): DecreaseVaultDebt {
  let decreaseVaultDebtEvent = changetype<DecreaseVaultDebt>(newMockEvent())

  decreaseVaultDebtEvent.parameters = new Array()

  decreaseVaultDebtEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  decreaseVaultDebtEvent.parameters.push(
    new ethereum.EventParam(
      "vaultId",
      ethereum.Value.fromUnsignedBigInt(vaultId)
    )
  )
  decreaseVaultDebtEvent.parameters.push(
    new ethereum.EventParam("debt", ethereum.Value.fromUnsignedBigInt(debt))
  )
  decreaseVaultDebtEvent.parameters.push(
    new ethereum.EventParam("dri", ethereum.Value.fromUnsignedBigInt(dri))
  )
  decreaseVaultDebtEvent.parameters.push(
    new ethereum.EventParam("cri", ethereum.Value.fromUnsignedBigInt(cri))
  )

  return decreaseVaultDebtEvent
}

export function createIncreaseVaultCollEvent(
  owner: Address,
  vaultId: BigInt,
  coll: BigInt,
  dri: BigInt,
  cri: BigInt
): IncreaseVaultColl {
  let increaseVaultCollEvent = changetype<IncreaseVaultColl>(newMockEvent())

  increaseVaultCollEvent.parameters = new Array()

  increaseVaultCollEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  increaseVaultCollEvent.parameters.push(
    new ethereum.EventParam(
      "vaultId",
      ethereum.Value.fromUnsignedBigInt(vaultId)
    )
  )
  increaseVaultCollEvent.parameters.push(
    new ethereum.EventParam("coll", ethereum.Value.fromUnsignedBigInt(coll))
  )
  increaseVaultCollEvent.parameters.push(
    new ethereum.EventParam("dri", ethereum.Value.fromUnsignedBigInt(dri))
  )
  increaseVaultCollEvent.parameters.push(
    new ethereum.EventParam("cri", ethereum.Value.fromUnsignedBigInt(cri))
  )

  return increaseVaultCollEvent
}

export function createIncreaseVaultDebtEvent(
  owner: Address,
  vaultId: BigInt,
  debt: BigInt,
  dri: BigInt,
  cri: BigInt
): IncreaseVaultDebt {
  let increaseVaultDebtEvent = changetype<IncreaseVaultDebt>(newMockEvent())

  increaseVaultDebtEvent.parameters = new Array()

  increaseVaultDebtEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  increaseVaultDebtEvent.parameters.push(
    new ethereum.EventParam(
      "vaultId",
      ethereum.Value.fromUnsignedBigInt(vaultId)
    )
  )
  increaseVaultDebtEvent.parameters.push(
    new ethereum.EventParam("debt", ethereum.Value.fromUnsignedBigInt(debt))
  )
  increaseVaultDebtEvent.parameters.push(
    new ethereum.EventParam("dri", ethereum.Value.fromUnsignedBigInt(dri))
  )
  increaseVaultDebtEvent.parameters.push(
    new ethereum.EventParam("cri", ethereum.Value.fromUnsignedBigInt(cri))
  )

  return increaseVaultDebtEvent
}

export function createLiquidateEvent(
  liquidator: Address,
  owner: Address,
  vaultId: BigInt
): Liquidate {
  let liquidateEvent = changetype<Liquidate>(newMockEvent())

  liquidateEvent.parameters = new Array()

  liquidateEvent.parameters.push(
    new ethereum.EventParam(
      "liquidator",
      ethereum.Value.fromAddress(liquidator)
    )
  )
  liquidateEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  liquidateEvent.parameters.push(
    new ethereum.EventParam(
      "vaultId",
      ethereum.Value.fromUnsignedBigInt(vaultId)
    )
  )

  return liquidateEvent
}

export function createRedeemEvent(
  redeemer: Address,
  debt: BigInt,
  coll: BigInt
): Redeem {
  let redeemEvent = changetype<Redeem>(newMockEvent())

  redeemEvent.parameters = new Array()

  redeemEvent.parameters.push(
    new ethereum.EventParam("redeemer", ethereum.Value.fromAddress(redeemer))
  )
  redeemEvent.parameters.push(
    new ethereum.EventParam("debt", ethereum.Value.fromUnsignedBigInt(debt))
  )
  redeemEvent.parameters.push(
    new ethereum.EventParam("coll", ethereum.Value.fromUnsignedBigInt(coll))
  )

  return redeemEvent
}
