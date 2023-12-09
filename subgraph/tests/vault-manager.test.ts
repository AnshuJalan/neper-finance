import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { CreateVault } from "../generated/schema"
import { CreateVault as CreateVaultEvent } from "../generated/VaultManager/VaultManager"
import { handleCreateVault } from "../src/vault-manager"
import { createCreateVaultEvent } from "./vault-manager-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let vaultId = BigInt.fromI32(234)
    let coll = BigInt.fromI32(234)
    let dri = BigInt.fromI32(234)
    let cri = BigInt.fromI32(234)
    let newCreateVaultEvent = createCreateVaultEvent(
      owner,
      vaultId,
      coll,
      dri,
      cri
    )
    handleCreateVault(newCreateVaultEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CreateVault created and stored", () => {
    assert.entityCount("CreateVault", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CreateVault",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CreateVault",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "vaultId",
      "234"
    )
    assert.fieldEquals(
      "CreateVault",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "coll",
      "234"
    )
    assert.fieldEquals(
      "CreateVault",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "dri",
      "234"
    )
    assert.fieldEquals(
      "CreateVault",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "cri",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
