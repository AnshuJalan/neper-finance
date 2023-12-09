import {
  CreateVault as CreateVaultEvent,
  DecreaseVaultColl as DecreaseVaultCollEvent,
  DecreaseVaultDebt as DecreaseVaultDebtEvent,
  IncreaseVaultColl as IncreaseVaultCollEvent,
  IncreaseVaultDebt as IncreaseVaultDebtEvent,
  Liquidate as LiquidateEvent,
  Redeem as RedeemEvent
} from "../generated/VaultManager/VaultManager"
import {
  CreateVault,
  DecreaseVaultColl,
  DecreaseVaultDebt,
  IncreaseVaultColl,
  IncreaseVaultDebt,
  Liquidate,
  Redeem
} from "../generated/schema"

export function handleCreateVault(event: CreateVaultEvent): void {
  let entity = new CreateVault(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.vaultId = event.params.vaultId
  entity.coll = event.params.coll
  entity.dri = event.params.dri
  entity.cri = event.params.cri

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDecreaseVaultColl(event: DecreaseVaultCollEvent): void {
  let entity = new DecreaseVaultColl(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.vaultId = event.params.vaultId
  entity.coll = event.params.coll
  entity.dri = event.params.dri
  entity.cri = event.params.cri

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDecreaseVaultDebt(event: DecreaseVaultDebtEvent): void {
  let entity = new DecreaseVaultDebt(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.vaultId = event.params.vaultId
  entity.debt = event.params.debt
  entity.dri = event.params.dri
  entity.cri = event.params.cri

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIncreaseVaultColl(event: IncreaseVaultCollEvent): void {
  let entity = new IncreaseVaultColl(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.vaultId = event.params.vaultId
  entity.coll = event.params.coll
  entity.dri = event.params.dri
  entity.cri = event.params.cri

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIncreaseVaultDebt(event: IncreaseVaultDebtEvent): void {
  let entity = new IncreaseVaultDebt(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.vaultId = event.params.vaultId
  entity.debt = event.params.debt
  entity.dri = event.params.dri
  entity.cri = event.params.cri

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLiquidate(event: LiquidateEvent): void {
  let entity = new Liquidate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.liquidator = event.params.liquidator
  entity.owner = event.params.owner
  entity.vaultId = event.params.vaultId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRedeem(event: RedeemEvent): void {
  let entity = new Redeem(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.redeemer = event.params.redeemer
  entity.debt = event.params.debt
  entity.coll = event.params.coll

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
