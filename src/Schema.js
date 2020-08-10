import {EntityComponent} from "@/EntityComponent";

export const fullSchema = {
        "$id": "https://aexer0e.github.io/bedrock-schema/",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "$ref": "#/definitions/Entity",
        "definitions": {
            "Entity": {
                "type": "object",
                "properties": {
                    "format_version": { "type": ["string", "number"], "format": "number", "examples": [ "1.10", "1.11", "1.12", "1.13", "1.14", "1.15", "1.16", 1, 2 ] },
                    "minecraft:entity": { "$ref": "#/definitions/entity" },
                    "animation_controllers": { "$ref": "#/definitions/animation_controllers" },
                    "animations": { "$ref": "#/definitions/animations" }
                }
            },
            "entity": {
                "title": "Entity",
                "type": "object",
                "properties": {
                    "description": { "$ref": "#/definitions/description"  },
                    "component_groups": { "$ref": "#/definitions/component_groups" },
                    "components": { "$ref": "#/definitions/components" },
                    "events": { "$ref": "#/definitions/events" }
                }
            },
            "animation_controllers": {
                "title": "Animation Controllers",
                "type": "object",
                "patternProperties": { "^.*$": { "$ref": "#/definitions/animation_controller" } }
            },
            "animation_controller": {
                "title": "Animation Controller",
                "type": "object",
                "properties": { "initial_state": { "type": "string" }, "states": { "$ref": "#/definitions/states" } }
            },
            "states": {
                "title": "States",
                "type": "object",
                "patternProperties": { "^.*$": { "$ref": "#/definitions/state" } },
                "properties": { "default": { "$ref": "#/definitions/state" } }
            },
            "state": {
                "title": "State",
                "type": "object",
                "properties": {
                    "on_entry": { "title": "On Entry", "type": "array" },
                    "on_exit": { "title": "On Exit", "type": "array" },
                    "animations": { "title": "Animations", "type": "array" },
                    "transitions": { "title": "Transitions", "type": "array", "items": { "type": "object" } }
                }
            },
            "animations": {
                "title": "Animations",
                "type": "object",
                "patternProperties": { "^.*$": { "$ref": "#/definitions/animation" } }
            },
            "animation": {
                "title": "Animation",
                "type": "object",
                "properties": { "timeline": { "$ref": "#/definitions/timeline" }, "animation_length": { "type": "number" } }
            },
            "timeline": {
                "title": "Timeline",
                "type": "object",
                "patternProperties": { "^[+-]?([0-9]*[.])?[0-9]*$": { "type": [ "array", "string"], "format": "string" } },
                "additionalProperties": false
            },
            "description": {
                "title": "Description",
                "type": "object",
                "properties": {
                    "identifier": { "type": "string" },
                    "is_spawnable": { "type": "boolean" },
                    "is_summonable": { "type": "boolean" },
                    "is_experimental": { "type": "boolean" },
                    "runtime_identifier": { "type": "string", "$ref": "#/definitions/library/entities" },
                    "scripts": { "type": "object", "properties": { "animate": { "type": "array", "items": { "examples": [ "execute_commands" ] } } } },
                    "animations": { "type": "object", "patternProperties": { "^.*$": { "type": "string" } }, "properties": { "execute_commands": { "type": "string" } } }
                }
            },
            "component_groups": {
                "type": "object",
                "patternProperties": { "^.*$": { "$ref": "#/definitions/library/components" } },
                "title": "Component Groups"
            },
            "components": {
                "title": "Components",
                "type": "object",
                "$ref": "#/definitions/library/components"
            },
            "events": {
                "title": "Events",
                "type": "object",
                "properties": {
                    "minecraft:entity_spawned": { "$ref": "#/definitions/event" },
                    "minecraft:born": { "$ref": "#/definitions/event" },
                    "minecraft:transformed": { "$ref": "#/definitions/event" },
                    "minecraf:minecraft:on_prime": { "$ref": "#/definitions/event" }
                },
                "patternProperties": { "^.*$": { "$ref": "#/definitions/event" } }
            },
            "event": {
                "title": "event",
                "type": "object",
                "properties": {
                    "add": { "$ref": "#/definitions/event_add" },
                    "remove": { "$ref": "#/definitions/event_remove" },
                    "sequence": { "$ref": "#/definitions/event_sequence" },
                    "randomize": { "$ref": "#/definitions/event_randomize" }
                }
            },
            "event_add": {
                "title": "Add",
                "type": "object",
                "properties": { "component_groups": { "type": "array", "format": "string" } }
            },
            "event_remove": {
                "title": "Remove",
                "type": "object",
                "properties": { "component_groups": { "type": "array", "format": "string" } }
            },
            "event_sequence": {
                "title": "Sequence",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "add": { "$ref": "#/definitions/event_add" },
                        "remove": { "$ref": "#/definitions/event_remove" },
                        "filters": { "$ref": "#/definitions/filters" },
                        "sequence": { "$ref": "#/definitions/event_sequence" },
                        "randomize": { "$ref": "#/definitions/event_randomize" }
                    }
                }
            },
            "event_randomize": {
                "title": "Randomize",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "weight": { "type": "integer" },
                        "add": { "$ref": "#/definitions/event_add" },
                        "remove": { "$ref": "#/definitions/event_remove" },
                        "sequence": { "$ref": "#/definitions/event_sequence" },
                        "randomize": { "$ref": "#/definitions/event_randomize" }
                    }
                }
            },
            "filters": {
                "title": "Filters",
                "type": "object",
                "properties": {
                    "subject": { "type": "string", "examples": [ "self", "other", "player", "target", "parent", "blocks" ] },
                    "test": { "type": "string", "$ref": "#/definitions/library/filters/tests" },
                    "operator": { "type": "string", "$ref": "#/definitions/library/filters/operators" },
                    "all_of": { "items": { "$ref": "#/definitions/filters" }, "type": "array" },
                    "any_of": { "items": { "$ref": "#/definitions/filters" }, "type": "array" },
                    "none_of": { "items": { "$ref": "#/definitions/filters" }, "type": "array" }
                },
                "allOf": [
                    {
                        "if": { "properties": { "test": { "$ref": "#/definitions/library/filters/tests/integer" } } },
                        "then": { "properties": { "value": { "type": "integer", "patternwas": "^[0-9]*$", "default": 0 } } }
                    },
                    {
                        "if": { "properties": { "test": { "$ref": "#/definitions/library/filters/tests/decimal" } } },
                        "then": { "properties": { "value": { "type": "number", "patternwas": "^[+-]?([0-9]*[.])?[0-9]*$", "default": 0.0 } } }
                    },
                    {
                        "if": { "properties": { "test": { "$ref": "#/definitions/library/filters/tests/boolean" } } },
                        "then": { "properties": { "value": { "type": "boolean" } } }
                    },
                    {
                        "if": { "properties": { "test": { "$ref": "#/definitions/library/filters/tests/string" } } },
                        "then": { "properties": { "value": { "type": "string" } } }
                    },
                    {
                        "if": { "properties": { "test": { "anyOf": [ { "const": "has_component" } ] } } },
                        "then": { "properties": { "value": { "type": "string", "$ref": "#/definitions/library/filters/values/components" } } }
                    },
                    {
                        "if": { "properties": { "test": { "anyOf": [ { "const": "is_difficulty" } ] } } },
                        "then": { "properties": { "value": { "type": "string", "$ref": "#/definitions/library/difficulties" } } }
                    },
                    {
                        "if": { "properties": { "test": { "anyOf": [ { "const": "has_equipment" } ] } } },
                        "then": { "allOf": [
                                {"properties": { "domain": { "type": "string", "$ref": "#/definitions/library/filters/domains/has_equipment" } } },
                                {"properties": { "value": { "type": "string", "$ref": "#/definitions/library/blocks" } } },
                                {"properties": { "value": { "type": "string", "$ref": "#/definitions/library/items" } } }
                            ] }
                    },
                    {
                        "if": { "properties": { "test": { "anyOf": [ { "const": "has_damage" } ] } } },
                        "then": { "allOf": [
                                {"properties": { "value": { "type": "string", "$ref": "#/definitions/library/filters/domains/has_damage" } } }
                            ] }
                    },
                    {
                        "if": { "properties": { "test": { "anyOf": [ { "const": "is_game_rule" } ] } } },
                        "then": { "properties": { "domain": { "type": "string", "$ref": "#/definitions/library/filters/domains/is_game_rule" } } }
                    }
                ]
            },
            "library": {
                "filters": {
                    "tests": {
                        "enum": [
                            "clock_time",
                            "has_ability",
                            "has_biome_tag",
                            "has_component",
                            "has_damage",
                            "has_equipment",
                            "has_mob_effect",
                            "has_tag",
                            "has_target",
                            "has_trade_supply",
                            "hourly_clock_time",
                            "in_caravan",
                            "in_clouds",
                            "distance_to_nearest_player",
                            "in_lava",
                            "in_water",
                            "in_water_or_rain",
                            "is_altitude",
                            "is_avoiding_mobs",
                            "is_biome",
                            "is_block",
                            "is_brightness",
                            "is_climbing",
                            "is_color",
                            "is_daytime",
                            "is_difficulty",
                            "is_family",
                            "is_game_rule",
                            "is_humid",
                            "is_immobile",
                            "is_in_village",
                            "is_leashed",
                            "is_leashed_to",
                            "is_mark_variant",
                            "is_moving",
                            "is_owner",
                            "is_riding",
                            "is_skin_id",
                            "is_sleeping",
                            "is_sneaking",
                            "is_snow_covered",
                            "is_target",
                            "is_temperature_type",
                            "is_temperature_value",
                            "is_underground",
                            "is_underwater",
                            "is_variant",
                            "is_visible",
                            "is_weather",
                            "moon_intensity",
                            "on_ground",
                            "on_ladder",
                            "rider_count",
                            "trusts",
                            "moon_phase"
                        ],
                        "boolean": {
                            "anyOf": [
                                { "const": "is_game_rule" },
                                { "const": "is_underwater" },
                                { "const": "in_water" },
                                { "const": "in_water_or_rain" },
                                { "const": "is_humid" },
                                { "const": "in_lava" },
                                { "const": "in_clouds" },
                                { "const": "in_caravan" },
                                { "const": "is_underground" },
                                { "const": "is_in_village" },
                                { "const": "on_ground" },
                                { "const": "on_ladder" },
                                { "const": "is_climbing" },
                                { "const": "is_sneaking" },
                                { "const": "is_moving" },
                                { "const": "is_riding" },
                                { "const": "is_owner" },
                                { "const": "is_target" },
                                { "const": "is_leashed_to" },
                                { "const": "is_leashed" },
                                { "const": "is_immobile" },
                                { "const": "is_avoiding_mobs" },
                                { "const": "is_visible" },
                                { "const": "is_snow_covered" },
                                { "const": "has_trade_supply" },
                                { "const": "trusts" },
                                { "const": "has_container_open" },
                                { "const": "has_target" }
                            ]
                        },
                        "decimal": {
                            "anyOf": [
                                { "const": "clock_time" },
                                { "const": "distance_to_nearest_player" },
                                { "const": "is_brightness" },
                                { "const": "is_temperature_value" },
                                { "const": "moon_intensity" }
                            ]
                        },
                        "integer": {
                            "anyOf": [
                                { "const": "hourly_clock_time" },
                                { "const": "moon_intensity" },
                                { "const": "is_mark_variant" },
                                { "const": "is_variant" },
                                { "const": "is_skin_id" },
                                { "const": "is_altitude" },
                                { "const": "rider_count" }
                            ]
                        },
                        "string": {
                            "anyOf": [
                                { "const": "is_family" },
                                { "const": "has_mob_effect" }
                            ]
                        }
                    },
                    "subjects": {
                        "enum": [
                            "self",
                            "other",
                            "player",
                            "target",
                            "parent",
                            "blocks"
                        ]
                    },
                    "operators": {
                        "enum": [
                            "!=",
                            "<",
                            "<=",
                            "<>",
                            "=",
                            "==",
                            ">",
                            ">=",
                            "equals",
                            "not"
                        ]
                    },
                    "values": {
                        "boolean": {
                            "enum": [
                                "true",
                                "false"
                            ]
                        },
                        "components": {
                            "enum": [
                                "minecraft:annotation.break_door",
                                "minecraft:annotation.open_door",
                                "minecraft:behavior.hide",
                                "minecraft:behavior.move_to_poi",
                                "minecraft:behavior.scared",
                                "minecraft:behavior.work",
                                "minecraft:behavior.avoid_mob_type",
                                "minecraft:behavior.beg",
                                "minecraft:behavior.break_door",
                                "minecraft:behavior.breed",
                                "minecraft:behavior.celebrate",
                                "minecraft:behavior.charge_attack",
                                "minecraft:behavior.charge_held_item",
                                "minecraft:behavior.circle_around_anchor",
                                "minecraft:behavior.controlled_by_player",
                                "minecraft:behavior.defend_trusted_target",
                                "minecraft:behavior.defend_village_target",
                                "minecraft:behavior.delayed_attack",
                                "minecraft:behavior.door_interact",
                                "minecraft:behavior.dragonchargeplayer",
                                "minecraft:behavior.dragondeath",
                                "minecraft:behavior.dragonflaming",
                                "minecraft:behavior.dragonholdingpattern",
                                "minecraft:behavior.dragonlanding",
                                "minecraft:behavior.dragonscanning",
                                "minecraft:behavior.dragonstrafeplayer",
                                "minecraft:behavior.dragontakeoff",
                                "minecraft:behavior.drink_potion",
                                "minecraft:behavior.drop_item_for",
                                "minecraft:behavior.eat_block",
                                "minecraft:behavior.eat_carried_item",
                                "minecraft:behavior.enderman_leave_block",
                                "minecraft:behavior.enderman_take_block",
                                "minecraft:behavior.explore_outskirts",
                                "minecraft:behavior.find_cover",
                                "minecraft:behavior.find_mount",
                                "minecraft:behavior.find_underwater_treasure",
                                "minecraft:behavior.flee_sun",
                                "minecraft:behavior.float",
                                "minecraft:behavior.float_wander",
                                "minecraft:behavior.follow_caravan",
                                "minecraft:behavior.follow_mob",
                                "minecraft:behavior.follow_owner",
                                "minecraft:behavior.follow_parent",
                                "minecraft:behavior.follow_target_captain",
                                "minecraft:behavior.go_home",
                                "minecraft:behavior.guardian_attack",
                                "minecraft:behavior.harvest_farm_block",
                                "minecraft:behavior.hold_ground",
                                "minecraft:behavior.hurt_by_target",
                                "minecraft:behavior.inspect_bookshelf",
                                "minecraft:behavior.knockback_roar",
                                "minecraft:behavior.lay_down",
                                "minecraft:behavior.lay_egg",
                                "minecraft:behavior.leap_at_target",
                                "minecraft:behavior.look_at_entity",
                                "minecraft:behavior.look_at_player",
                                "minecraft:behavior.look_at_target",
                                "minecraft:behavior.look_at_trading_player",
                                "minecraft:behavior.make_love",
                                "minecraft:behavior.melee_attack",
                                "minecraft:behavior.mingle",
                                "minecraft:behavior.mount_pathing",
                                "minecraft:behavior.move_indoors",
                                "minecraft:behavior.move_through_village",
                                "minecraft:behavior.move_to_land",
                                "minecraft:behavior.move_to_random_block",
                                "minecraft:behavior.move_to_village",
                                "minecraft:behavior.move_to_water",
                                "minecraft:behavior.move_towards_restriction",
                                "minecraft:behavior.move_towards_target",
                                "minecraft:behavior.nap",
                                "minecraft:behavior.nearest_attackable_target",
                                "minecraft:behavior.nearest_prioritized_attackable_target",
                                "minecraft:behavior.ocelot_sit_on_block",
                                "minecraft:behavior.ocelotattack",
                                "minecraft:behavior.offer_flower",
                                "minecraft:behavior.open_door",
                                "minecraft:behavior.owner_hurt_by_target",
                                "minecraft:behavior.owner_hurt_target",
                                "minecraft:behavior.panic",
                                "minecraft:behavior.peek",
                                "minecraft:behavior.pet_sleep_with_owner",
                                "minecraft:behavior.pickup_items",
                                "minecraft:behavior.play",
                                "minecraft:behavior.player_ride_tamed",
                                "minecraft:behavior.raid_garden",
                                "minecraft:behavior.random_breach",
                                "minecraft:behavior.random_fly",
                                "minecraft:behavior.random_hover",
                                "minecraft:behavior.random_look_around",
                                "minecraft:behavior.random_look_around_and_sit",
                                "minecraft:behavior.random_sitting",
                                "minecraft:behavior.random_stroll",
                                "minecraft:behavior.random_swim",
                                "minecraft:behavior.ranged_attack",
                                "minecraft:behavior.receive_love",
                                "minecraft:behavior.restrict_open_door",
                                "minecraft:behavior.restrict_sun",
                                "minecraft:behavior.roll",
                                "minecraft:behavior.run_around_like_crazy",
                                "minecraft:behavior.send_event",
                                "minecraft:behavior.share_items",
                                "minecraft:behavior.silverfish_merge_with_stone",
                                "minecraft:behavior.silverfish_wake_up_friends",
                                "minecraft:behavior.skeleton_horse_trap",
                                "minecraft:behavior.sleep",
                                "minecraft:behavior.slime_attack",
                                "minecraft:behavior.slime_float",
                                "minecraft:behavior.slime_keep_on_jumping",
                                "minecraft:behavior.slime_random_direction",
                                "minecraft:behavior.snacking",
                                "minecraft:behavior.sneeze",
                                "minecraft:behavior.squid_dive",
                                "minecraft:behavior.squid_flee",
                                "minecraft:behavior.squid_idle",
                                "minecraft:behavior.squid_move_away_from_ground",
                                "minecraft:behavior.squid_out_of_water",
                                "minecraft:behavior.stalk_and_pounce_on_target",
                                "minecraft:behavior.stay_while_sitting",
                                "minecraft:behavior.stomp_attack",
                                "minecraft:behavior.stomp_turtle_egg",
                                "minecraft:behavior.stroll_towards_village",
                                "minecraft:behavior.summon_entity",
                                "minecraft:behavior.swell",
                                "minecraft:behavior.swim_idle",
                                "minecraft:behavior.swim_wander",
                                "minecraft:behavior.swim_with_entity",
                                "minecraft:behavior.swoop_attack",
                                "minecraft:behavior.target_when_pushed",
                                "minecraft:behavior.take_flower",
                                "minecraft:behavior.target_when_pushed",
                                "minecraft:behavior.tempt",
                                "minecraft:behavior.trade_interest",
                                "minecraft:behavior.trade_with_player",
                                "minecraft:behavior.vex_copy_owner_target",
                                "minecraft:behavior.vex_random_move",
                                "minecraft:behavior.wither_random_attack_pos_goal",
                                "minecraft:behavior.wither_target_highest_damage",
                                "minecraft:addrider",
                                "minecraft:admire_item",
                                "minecraft:ageable",
                                "minecraft:ambient_sound_interval",
                                "minecraft:angry",
                                "minecraft:area_attack",
                                "minecraft:attack",
                                "minecraft:attack_cooldown",
                                "minecraft:attack_damage",
                                "minecraft:balloonable",
                                "minecraft:barter",
                                "minecraft:block_sensor",
                                "minecraft:boostable",
                                "minecraft:boss",
                                "minecraft:break_blocks",
                                "minecraft:breathable",
                                "minecraft:breedable",
                                "minecraft:bribeable",
                                "minecraft:burns_in_daylight",
                                "minecraft:can_climb",
                                "minecraft:can_fly",
                                "minecraft:can_power_jump",
                                "minecraft:celebrate_hunt",
                                "minecraft:collision_box",
                                "minecraft:color",
                                "minecraft:color2",
                                "minecraft:custom_hit_test",
                                "minecraft:damage_over_time",
                                "minecraft:damage_sensor",
                                "minecraft:default_look_angle",
                                "minecraft:despawn",
                                "minecraft:dweller",
                                "minecraft:economy_trade_table",
                                "minecraft:environment_sensor",
                                "minecraft:entity_sensor",
                                "minecraft:equipment",
                                "minecraft:equippable",
                                "minecraft:experience_reward",
                                "minecraft:explode",
                                "minecraft:fire_immune",
                                "minecraft:floats_in_liquid",
                                "minecraft:flocking",
                                "minecraft:flying_speed",
                                "minecraft:follow_range",
                                "minecraft:foot_size",
                                "minecraft:friction_modifier",
                                "minecraft:genetics",
                                "minecraft:giveable",
                                "minecraft:ground_offset",
                                "minecraft:group_size",
                                "minecraft:grows_crop",
                                "minecraft:healable",
                                "minecraft:health",
                                "minecraft:hide",
                                "minecraft:home",
                                "minecraft:horse.jump_strength",
                                "minecraft:hurt_on_condition",
                                "minecraft:input_ground_controlled",
                                "minecraft:insomnia",
                                "minecraft:interact",
                                "minecraft:inventory",
                                "minecraft:is_baby",
                                "minecraft:is_charged",
                                "minecraft:is_chested",
                                "minecraft:is_dyeable",
                                "minecraft:is_hidden_when_invisible",
                                "minecraft:is_ignited",
                                "minecraft:is_illager_captain",
                                "minecraft:is_saddled",
                                "minecraft:is_shaking",
                                "minecraft:is_sheared",
                                "minecraft:is_stackable",
                                "minecraft:is_stunned",
                                "minecraft:is_tamed",
                                "minecraft:item_controllable",
                                "minecraft:item_hopper",
                                "minecraft:jump.dynamic",
                                "minecraft:jump.static",
                                "minecraft:knockback_resistance",
                                "minecraft:lava_movement",
                                "minecraft:leashable",
                                "minecraft:lookat",
                                "minecraft:loot",
                                "minecraft:managed_wandering_trader",
                                "minecraft:mark_variant",
                                "minecraft:mob_effect",
                                "minecraft:movement",
                                "minecraft:movement.amphibious",
                                "minecraft:movement.basic",
                                "minecraft:movement.fly",
                                "minecraft:movement.generic",
                                "minecraft:movement.hover",
                                "minecraft:movement.jump",
                                "minecraft:movement.glide",
                                "minecraft:skin_id",
                                "minecraft:movement.skip",
                                "minecraft:movement.sway",
                                "minecraft:nameable",
                                "minecraft:navigation.climb",
                                "minecraft:navigation.float",
                                "minecraft:navigation.fly",
                                "minecraft:navigation.generic",
                                "minecraft:navigation.hover",
                                "minecraft:navigation.swim",
                                "minecraft:navigation.walk",
                                "minecraft:on_death",
                                "minecraft:on_friendly_anger",
                                "minecraft:on_hurt",
                                "minecraft:on_hurt_by_player",
                                "minecraft:on_ignite",
                                "minecraft:on_start_landing",
                                "minecraft:on_start_takeoff",
                                "minecraft:on_target_acquired",
                                "minecraft:on_target_escape",
                                "minecraft:on_wake_with_owner",
                                "minecraft:peek",
                                "minecraft:persistent",
                                "minecraft:physics",
                                "minecraft:player.saturation",
                                "minecraft:player.exhaustion",
                                "minecraft:player.level",
                                "minecraft:player.experience",
                                "minecraft:pushable",
                                "minecraft:push_through",
                                "minecraft:preferred_path",
                                "minecraft:projectile",
                                "minecraft:raid_trigger",
                                "minecraft:rail_movement",
                                "minecraft:rail_sensor",
                                "minecraft:ravager_blocked",
                                "minecraft:rideable",
                                "minecraft:scaffolding_climber",
                                "minecraft:scale",
                                "minecraft:scale_by_age",
                                "minecraft:scheduler",
                                "minecraft:shareables",
                                "minecraft:shooter",
                                "minecraft:sittable",
                                "minecraft:sound_volume",
                                "minecraft:spawn_entity",
                                "minecraft:spell_effects",
                                "minecraft:strength",
                                "minecraft:tameable",
                                "minecraft:tamemount",
                                "minecraft:target_nearby_sensor",
                                "minecraft:teleport",
                                "minecraft:tick_world",
                                "minecraft:timer",
                                "minecraft:trade_resupply",
                                "minecraft:trade_table",
                                "minecraft:trail",
                                "minecraft:transformation",
                                "minecraft:trusting",
                                "minecraft:trust",
                                "minecraft:type_family",
                                "minecraft:underwater_movement",
                                "minecraft:variant",
                                "minecraft:walk_animation_speed",
                                "minecraft:wants_jockey",
                                "minecraft:water_movement"
                            ]
                        }
                    },
                    "domains": {
                        "is_game_rule": {
                            "enum": [
                                "alwaysday",
                                "commandblockoutput",
                                "commandblocksenabled",
                                "dodaylightcycle",
                                "doentitydrops",
                                "dofiretick",
                                "doimmediaterespawn",
                                "domobloot",
                                "domobspawning",
                                "dotiledrops",
                                "doweathercycle",
                                "drowningdamage",
                                "falldamage",
                                "firedamage",
                                "functioncommandlimit",
                                "keepinventory",
                                "maxcommandchainlength",
                                "mobgriefing",
                                "naturalregeneration",
                                "pvp",
                                "randomtickspeed",
                                "sendcommandfeedback",
                                "showcoordinates",
                                "showdeathmessages",
                                "tntexplodes"
                            ]
                        },
                        "has_equipment": {
                            "enum": [
                                "any",
                                "armor",
                                "feet",
                                "hand",
                                "head",
                                "leg",
                                "torso"
                            ]
                        },
                        "has_damage": {
                            "enum": [
                                "anvil",
                                "attack",
                                "block_explosion",
                                "contact",
                                "drowning",
                                "entity_explosion",
                                "fall",
                                "falling_block",
                                "fatal",
                                "fire",
                                "fire_tick",
                                "fly_into_wall",
                                "lava",
                                "magic",
                                "none",
                                "override",
                                "piston",
                                "projectile",
                                "starve",
                                "suffocation",
                                "suicide",
                                "thorns",
                                "void",
                                "wither"
                            ]
                        }
                    }
                },
                "queries": {
                    "examples": [
                        "query"
                    ]
                },
                "items": {
                    "examples": [
                        "minecraft:acacia_button",
                        "minecraft:acacia_door",
                        "minecraft:acacia_fence_gate",
                        "minecraft:acacia_pressure_plate",
                        "minecraft:acacia_sign",
                        "minecraft:acacia_stairs",
                        "minecraft:acacia_standing_sign",
                        "minecraft:acacia_trapdoor",
                        "minecraft:acacia_wall_sign",
                        "minecraft:activator_rail",
                        "minecraft:air",
                        "minecraft:andesite_stairs",
                        "minecraft:anvil",
                        "minecraft:apple",
                        "minecraft:appleenchanted",
                        "minecraft:armor_stand",
                        "minecraft:arrow",
                        "minecraft:baked_potato",
                        "minecraft:balloon",
                        "minecraft:bamboo",
                        "minecraft:bamboo_sapling",
                        "minecraft:banner",
                        "minecraft:banner_pattern",
                        "minecraft:barrel",
                        "minecraft:barrier",
                        "minecraft:beacon",
                        "minecraft:bed",
                        "minecraft:bedrock",
                        "minecraft:beef",
                        "minecraft:beetroot",
                        "minecraft:beetroot_seeds",
                        "minecraft:beetroot_soup",
                        "minecraft:bell",
                        "minecraft:birch_button",
                        "minecraft:birch_door",
                        "minecraft:birch_fence_gate",
                        "minecraft:birch_pressure_plate",
                        "minecraft:birch_sign",
                        "minecraft:birch_stairs",
                        "minecraft:birch_standing_sign",
                        "minecraft:birch_trapdoor",
                        "minecraft:birch_wall_sign",
                        "minecraft:black_glazed_terracotta",
                        "minecraft:blast_furnace",
                        "minecraft:blaze_powder",
                        "minecraft:blaze_rod",
                        "minecraft:bleach",
                        "minecraft:blue_glazed_terracotta",
                        "minecraft:blue_ice",
                        "minecraft:boat",
                        "minecraft:bone",
                        "minecraft:bone_block",
                        "minecraft:book",
                        "minecraft:bookshelf",
                        "minecraft:bow",
                        "minecraft:bowl",
                        "minecraft:bread",
                        "minecraft:brewing_stand",
                        "minecraft:brewingstandblock",
                        "minecraft:brick",
                        "minecraft:brick_block",
                        "minecraft:brick_stairs",
                        "minecraft:brown_glazed_terracotta",
                        "minecraft:brown_mushroom",
                        "minecraft:brown_mushroom_block",
                        "minecraft:bubble_column",
                        "minecraft:bucket",
                        "minecraft:cactus",
                        "minecraft:cake",
                        "minecraft:camera",
                        "minecraft:campfire",
                        "minecraft:carpet",
                        "minecraft:carrot",
                        "minecraft:carrotonastick",
                        "minecraft:carrots",
                        "minecraft:cartography_table",
                        "minecraft:carved_pumpkin",
                        "minecraft:cauldron",
                        "minecraft:chain_command_block",
                        "minecraft:chainmail_boots",
                        "minecraft:chainmail_chestplate",
                        "minecraft:chainmail_helmet",
                        "minecraft:chainmail_leggings",
                        "minecraft:chemical_heat",
                        "minecraft:chemistry_table",
                        "minecraft:chest",
                        "minecraft:chest_minecart",
                        "minecraft:chicken",
                        "minecraft:chorus_flower",
                        "minecraft:chorus_fruit",
                        "minecraft:chorus_fruit_popped",
                        "minecraft:chorus_plant",
                        "minecraft:clay",
                        "minecraft:clay_ball",
                        "minecraft:clock",
                        "minecraft:clownfish",
                        "minecraft:coal",
                        "minecraft:coal_block",
                        "minecraft:coal_ore",
                        "minecraft:cobblestone",
                        "minecraft:cobblestone_wall",
                        "minecraft:cocoa",
                        "minecraft:colored_torch_bp",
                        "minecraft:colored_torch_rg",
                        "minecraft:command_block",
                        "minecraft:command_block_minecart",
                        "minecraft:comparator",
                        "minecraft:compass",
                        "minecraft:composter",
                        "minecraft:compound",
                        "minecraft:concrete",
                        "minecraft:concrete_powder",
                        "minecraft:conduit",
                        "minecraft:cooked_beef",
                        "minecraft:cooked_chicken",
                        "minecraft:cooked_fish",
                        "minecraft:cooked_porkchop",
                        "minecraft:cooked_rabbit",
                        "minecraft:cooked_salmon",
                        "minecraft:cookie",
                        "minecraft:coral",
                        "minecraft:coral_block",
                        "minecraft:coral_fan",
                        "minecraft:coral_fan_dead",
                        "minecraft:coral_fan_hang",
                        "minecraft:coral_fan_hang2",
                        "minecraft:coral_fan_hang3",
                        "minecraft:crafting_table",
                        "minecraft:crossbow",
                        "minecraft:cyan_glazed_terracotta",
                        "minecraft:dark_oak_button",
                        "minecraft:dark_oak_door",
                        "minecraft:dark_oak_fence_gate",
                        "minecraft:dark_oak_pressure_plate",
                        "minecraft:dark_oak_stairs",
                        "minecraft:dark_oak_trapdoor",
                        "minecraft:dark_prismarine_stairs",
                        "minecraft:darkoak_sign",
                        "minecraft:darkoak_standing_sign",
                        "minecraft:darkoak_wall_sign",
                        "minecraft:daylight_detector",
                        "minecraft:daylight_detector_inverted",
                        "minecraft:deadbush",
                        "minecraft:detector_rail",
                        "minecraft:diamond",
                        "minecraft:diamond_axe",
                        "minecraft:diamond_block",
                        "minecraft:diamond_boots",
                        "minecraft:diamond_chestplate",
                        "minecraft:diamond_helmet",
                        "minecraft:diamond_hoe",
                        "minecraft:diamond_leggings",
                        "minecraft:diamond_ore",
                        "minecraft:diamond_pickaxe",
                        "minecraft:diamond_shovel",
                        "minecraft:diamond_sword",
                        "minecraft:diorite_stairs",
                        "minecraft:dirt",
                        "minecraft:dispenser",
                        "minecraft:double_plant",
                        "minecraft:double_stone_slab",
                        "minecraft:double_stone_slab2",
                        "minecraft:double_stone_slab3",
                        "minecraft:double_stone_slab4",
                        "minecraft:double_wooden_slab",
                        "minecraft:dragon_breath",
                        "minecraft:dragon_egg",
                        "minecraft:dried_kelp",
                        "minecraft:dried_kelp_block",
                        "minecraft:dropper",
                        "minecraft:dye",
                        "minecraft:egg",
                        "minecraft:element_0",
                        "minecraft:element_1",
                        "minecraft:element_10",
                        "minecraft:element_100",
                        "minecraft:element_101",
                        "minecraft:element_102",
                        "minecraft:element_103",
                        "minecraft:element_104",
                        "minecraft:element_105",
                        "minecraft:element_106",
                        "minecraft:element_107",
                        "minecraft:element_108",
                        "minecraft:element_109",
                        "minecraft:element_11",
                        "minecraft:element_110",
                        "minecraft:element_111",
                        "minecraft:element_112",
                        "minecraft:element_113",
                        "minecraft:element_114",
                        "minecraft:element_115",
                        "minecraft:element_116",
                        "minecraft:element_117",
                        "minecraft:element_118",
                        "minecraft:element_12",
                        "minecraft:element_13",
                        "minecraft:element_14",
                        "minecraft:element_15",
                        "minecraft:element_16",
                        "minecraft:element_17",
                        "minecraft:element_18",
                        "minecraft:element_19",
                        "minecraft:element_2",
                        "minecraft:element_20",
                        "minecraft:element_21",
                        "minecraft:element_22",
                        "minecraft:element_23",
                        "minecraft:element_24",
                        "minecraft:element_25",
                        "minecraft:element_26",
                        "minecraft:element_27",
                        "minecraft:element_28",
                        "minecraft:element_29",
                        "minecraft:element_3",
                        "minecraft:element_30",
                        "minecraft:element_31",
                        "minecraft:element_32",
                        "minecraft:element_33",
                        "minecraft:element_34",
                        "minecraft:element_35",
                        "minecraft:element_36",
                        "minecraft:element_37",
                        "minecraft:element_38",
                        "minecraft:element_39",
                        "minecraft:element_4",
                        "minecraft:element_40",
                        "minecraft:element_41",
                        "minecraft:element_42",
                        "minecraft:element_43",
                        "minecraft:element_44",
                        "minecraft:element_45",
                        "minecraft:element_46",
                        "minecraft:element_47",
                        "minecraft:element_48",
                        "minecraft:element_49",
                        "minecraft:element_5",
                        "minecraft:element_50",
                        "minecraft:element_51",
                        "minecraft:element_52",
                        "minecraft:element_53",
                        "minecraft:element_54",
                        "minecraft:element_55",
                        "minecraft:element_56",
                        "minecraft:element_57",
                        "minecraft:element_58",
                        "minecraft:element_59",
                        "minecraft:element_6",
                        "minecraft:element_60",
                        "minecraft:element_61",
                        "minecraft:element_62",
                        "minecraft:element_63",
                        "minecraft:element_64",
                        "minecraft:element_65",
                        "minecraft:element_66",
                        "minecraft:element_67",
                        "minecraft:element_68",
                        "minecraft:element_69",
                        "minecraft:element_7",
                        "minecraft:element_70",
                        "minecraft:element_71",
                        "minecraft:element_72",
                        "minecraft:element_73",
                        "minecraft:element_74",
                        "minecraft:element_75",
                        "minecraft:element_76",
                        "minecraft:element_77",
                        "minecraft:element_78",
                        "minecraft:element_79",
                        "minecraft:element_8",
                        "minecraft:element_80",
                        "minecraft:element_81",
                        "minecraft:element_82",
                        "minecraft:element_83",
                        "minecraft:element_84",
                        "minecraft:element_85",
                        "minecraft:element_86",
                        "minecraft:element_87",
                        "minecraft:element_88",
                        "minecraft:element_89",
                        "minecraft:element_9",
                        "minecraft:element_90",
                        "minecraft:element_91",
                        "minecraft:element_92",
                        "minecraft:element_93",
                        "minecraft:element_94",
                        "minecraft:element_95",
                        "minecraft:element_96",
                        "minecraft:element_97",
                        "minecraft:element_98",
                        "minecraft:element_99",
                        "minecraft:elytra",
                        "minecraft:emerald",
                        "minecraft:emerald_block",
                        "minecraft:emerald_ore",
                        "minecraft:emptymap",
                        "minecraft:enchanted_book",
                        "minecraft:enchanting_table",
                        "minecraft:end_brick_stairs",
                        "minecraft:end_bricks",
                        "minecraft:end_crystal",
                        "minecraft:end_gateway",
                        "minecraft:end_portal",
                        "minecraft:end_portal_frame",
                        "minecraft:end_rod",
                        "minecraft:end_stone",
                        "minecraft:ender_chest",
                        "minecraft:ender_eye",
                        "minecraft:ender_pearl",
                        "minecraft:experience_bottle",
                        "minecraft:farmland",
                        "minecraft:feather",
                        "minecraft:fence",
                        "minecraft:fence_gate",
                        "minecraft:fermented_spider_eye",
                        "minecraft:fire",
                        "minecraft:fireball",
                        "minecraft:fireworks",
                        "minecraft:fireworkscharge",
                        "minecraft:fish",
                        "minecraft:fishing_rod",
                        "minecraft:fletching_table",
                        "minecraft:flint",
                        "minecraft:flint_and_steel",
                        "minecraft:flower_pot",
                        "minecraft:flowing_lava",
                        "minecraft:flowing_water",
                        "minecraft:frame",
                        "minecraft:frosted_ice",
                        "minecraft:furnace",
                        "minecraft:ghast_tear",
                        "minecraft:glass",
                        "minecraft:glass_bottle",
                        "minecraft:glass_pane",
                        "minecraft:glow_stick",
                        "minecraft:glowingobsidian",
                        "minecraft:glowstone",
                        "minecraft:glowstone_dust",
                        "minecraft:gold_block",
                        "minecraft:gold_ingot",
                        "minecraft:gold_nugget",
                        "minecraft:gold_ore",
                        "minecraft:golden_apple",
                        "minecraft:golden_axe",
                        "minecraft:golden_boots",
                        "minecraft:golden_carrot",
                        "minecraft:golden_chestplate",
                        "minecraft:golden_helmet",
                        "minecraft:golden_hoe",
                        "minecraft:golden_leggings",
                        "minecraft:golden_pickaxe",
                        "minecraft:golden_rail",
                        "minecraft:golden_shovel",
                        "minecraft:golden_sword",
                        "minecraft:granite_stairs",
                        "minecraft:grass",
                        "minecraft:grass_path",
                        "minecraft:gravel",
                        "minecraft:gray_glazed_terracotta",
                        "minecraft:green_glazed_terracotta",
                        "minecraft:grindstone",
                        "minecraft:gunpowder",
                        "minecraft:hard_glass",
                        "minecraft:hard_glass_pane",
                        "minecraft:hard_stained_glass",
                        "minecraft:hard_stained_glass_pane",
                        "minecraft:hardened_clay",
                        "minecraft:hay_block",
                        "minecraft:heart_of_the_sea",
                        "minecraft:heavy_weighted_pressure_plate",
                        "minecraft:hopper",
                        "minecraft:hopper_minecart",
                        "minecraft:horsearmordiamond",
                        "minecraft:horsearmorgold",
                        "minecraft:horsearmoriron",
                        "minecraft:horsearmorleather",
                        "minecraft:ice",
                        "minecraft:ice_bomb",
                        "minecraft:info_update",
                        "minecraft:info_update2",
                        "minecraft:invisiblebedrock",
                        "minecraft:iron_axe",
                        "minecraft:iron_bars",
                        "minecraft:iron_block",
                        "minecraft:iron_boots",
                        "minecraft:iron_chestplate",
                        "minecraft:iron_door",
                        "minecraft:iron_helmet",
                        "minecraft:iron_hoe",
                        "minecraft:iron_ingot",
                        "minecraft:iron_leggings",
                        "minecraft:iron_nugget",
                        "minecraft:iron_ore",
                        "minecraft:iron_pickaxe",
                        "minecraft:iron_shovel",
                        "minecraft:iron_sword",
                        "minecraft:iron_trapdoor",
                        "minecraft:item.acacia_door",
                        "minecraft:item.bed",
                        "minecraft:item.beetroot",
                        "minecraft:item.birch_door",
                        "minecraft:item.cake",
                        "minecraft:item.camera",
                        "minecraft:item.campfire",
                        "minecraft:item.cauldron",
                        "minecraft:item.dark_oak_door",
                        "minecraft:item.flower_pot",
                        "minecraft:item.frame",
                        "minecraft:item.hopper",
                        "minecraft:item.iron_door",
                        "minecraft:item.jungle_door",
                        "minecraft:item.kelp",
                        "minecraft:item.nether_wart",
                        "minecraft:item.reeds",
                        "minecraft:item.skull",
                        "minecraft:item.spruce_door",
                        "minecraft:item.wheat",
                        "minecraft:item.wooden_door",
                        "minecraft:jigsaw",
                        "minecraft:jukebox",
                        "minecraft:jungle_button",
                        "minecraft:jungle_door",
                        "minecraft:jungle_fence_gate",
                        "minecraft:jungle_pressure_plate",
                        "minecraft:jungle_sign",
                        "minecraft:jungle_stairs",
                        "minecraft:jungle_standing_sign",
                        "minecraft:jungle_trapdoor",
                        "minecraft:jungle_wall_sign",
                        "minecraft:kelp",
                        "minecraft:ladder",
                        "minecraft:lantern",
                        "minecraft:lapis_block",
                        "minecraft:lapis_ore",
                        "minecraft:lava",
                        "minecraft:lava_cauldron",
                        "minecraft:lead",
                        "minecraft:leather",
                        "minecraft:leather_boots",
                        "minecraft:leather_chestplate",
                        "minecraft:leather_helmet",
                        "minecraft:leather_leggings",
                        "minecraft:leaves",
                        "minecraft:leaves2",
                        "minecraft:lectern",
                        "minecraft:lever",
                        "minecraft:light_block",
                        "minecraft:light_blue_glazed_terracotta",
                        "minecraft:light_weighted_pressure_plate",
                        "minecraft:lime_glazed_terracotta",
                        "minecraft:lingering_potion",
                        "minecraft:lit_blast_furnace",
                        "minecraft:lit_furnace",
                        "minecraft:lit_pumpkin",
                        "minecraft:lit_redstone_lamp",
                        "minecraft:lit_redstone_ore",
                        "minecraft:lit_smoker",
                        "minecraft:log",
                        "minecraft:log2",
                        "minecraft:loom",
                        "minecraft:magenta_glazed_terracotta",
                        "minecraft:magma",
                        "minecraft:magma_cream",
                        "minecraft:map",
                        "minecraft:medicine",
                        "minecraft:melon",
                        "minecraft:melon_block",
                        "minecraft:melon_seeds",
                        "minecraft:melon_stem",
                        "minecraft:minecart",
                        "minecraft:mob_spawner",
                        "minecraft:monster_egg",
                        "minecraft:mossy_cobblestone",
                        "minecraft:mossy_cobblestone_stairs",
                        "minecraft:mossy_stone_brick_stairs",
                        "minecraft:movingblock",
                        "minecraft:mushroom_stew",
                        "minecraft:muttoncooked",
                        "minecraft:muttonraw",
                        "minecraft:mycelium",
                        "minecraft:name_tag",
                        "minecraft:nautilus_shell",
                        "minecraft:nether_brick",
                        "minecraft:nether_brick_fence",
                        "minecraft:nether_brick_stairs",
                        "minecraft:nether_wart",
                        "minecraft:nether_wart_block",
                        "minecraft:netherbrick",
                        "minecraft:netherrack",
                        "minecraft:netherreactor",
                        "minecraft:netherstar",
                        "minecraft:normal_stone_stairs",
                        "minecraft:noteblock",
                        "minecraft:oak_stairs",
                        "minecraft:observer",
                        "minecraft:obsidian",
                        "minecraft:orange_glazed_terracotta",
                        "minecraft:packed_ice",
                        "minecraft:painting",
                        "minecraft:paper",
                        "minecraft:phantom_membrane",
                        "minecraft:pink_glazed_terracotta",
                        "minecraft:piston",
                        "minecraft:pistonarmcollision",
                        "minecraft:planks",
                        "minecraft:podzol",
                        "minecraft:poisonous_potato",
                        "minecraft:polished_andesite_stairs",
                        "minecraft:polished_diorite_stairs",
                        "minecraft:polished_granite_stairs",
                        "minecraft:porkchop",
                        "minecraft:portal",
                        "minecraft:potato",
                        "minecraft:potatoes",
                        "minecraft:potion",
                        "minecraft:powered_comparator",
                        "minecraft:powered_repeater",
                        "minecraft:prismarine",
                        "minecraft:prismarine_bricks_stairs",
                        "minecraft:prismarine_crystals",
                        "minecraft:prismarine_shard",
                        "minecraft:prismarine_stairs",
                        "minecraft:pufferfish",
                        "minecraft:pumpkin",
                        "minecraft:pumpkin_pie",
                        "minecraft:pumpkin_seeds",
                        "minecraft:pumpkin_stem",
                        "minecraft:purple_glazed_terracotta",
                        "minecraft:purpur_block",
                        "minecraft:purpur_stairs",
                        "minecraft:quartz",
                        "minecraft:quartz_block",
                        "minecraft:quartz_ore",
                        "minecraft:quartz_stairs",
                        "minecraft:rabbit",
                        "minecraft:rabbit_foot",
                        "minecraft:rabbit_hide",
                        "minecraft:rabbit_stew",
                        "minecraft:rail",
                        "minecraft:rapid_fertilizer",
                        "minecraft:real_double_stone_slab",
                        "minecraft:real_double_stone_slab2",
                        "minecraft:real_double_stone_slab3",
                        "minecraft:real_double_stone_slab4",
                        "minecraft:record_11",
                        "minecraft:record_13",
                        "minecraft:record_blocks",
                        "minecraft:record_cat",
                        "minecraft:record_chirp",
                        "minecraft:record_far",
                        "minecraft:record_mall",
                        "minecraft:record_mellohi",
                        "minecraft:record_stal",
                        "minecraft:record_strad",
                        "minecraft:record_wait",
                        "minecraft:record_ward",
                        "minecraft:red_flower",
                        "minecraft:red_glazed_terracotta",
                        "minecraft:red_mushroom",
                        "minecraft:red_mushroom_block",
                        "minecraft:red_nether_brick",
                        "minecraft:red_nether_brick_stairs",
                        "minecraft:red_sandstone",
                        "minecraft:red_sandstone_stairs",
                        "minecraft:redstone",
                        "minecraft:redstone_block",
                        "minecraft:redstone_lamp",
                        "minecraft:redstone_ore",
                        "minecraft:redstone_torch",
                        "minecraft:redstone_wire",
                        "minecraft:reeds",
                        "minecraft:repeater",
                        "minecraft:repeating_command_block",
                        "minecraft:reserved6",
                        "minecraft:rotten_flesh",
                        "minecraft:saddle",
                        "minecraft:salmon",
                        "minecraft:sand",
                        "minecraft:sandstone",
                        "minecraft:sandstone_stairs",
                        "minecraft:sapling",
                        "minecraft:scaffolding",
                        "minecraft:sea_pickle",
                        "minecraft:seagrass",
                        "minecraft:sealantern",
                        "minecraft:shears",
                        "minecraft:shield",
                        "minecraft:shulker_box",
                        "minecraft:shulker_shell",
                        "minecraft:sign",
                        "minecraft:silver_glazed_terracotta",
                        "minecraft:skull",
                        "minecraft:slime",
                        "minecraft:slime_ball",
                        "minecraft:smithing_table",
                        "minecraft:smoker",
                        "minecraft:smooth_quartz_stairs",
                        "minecraft:smooth_red_sandstone_stairs",
                        "minecraft:smooth_sandstone_stairs",
                        "minecraft:smooth_stone",
                        "minecraft:snow",
                        "minecraft:snow_layer",
                        "minecraft:snowball",
                        "minecraft:soul_sand",
                        "minecraft:sparkler",
                        "minecraft:spawn_egg",
                        "minecraft:speckled_melon",
                        "minecraft:spider_eye",
                        "minecraft:splash_potion",
                        "minecraft:sponge",
                        "minecraft:spruce_button",
                        "minecraft:spruce_door",
                        "minecraft:spruce_fence_gate",
                        "minecraft:spruce_pressure_plate",
                        "minecraft:spruce_sign",
                        "minecraft:spruce_stairs",
                        "minecraft:spruce_standing_sign",
                        "minecraft:spruce_trapdoor",
                        "minecraft:spruce_wall_sign",
                        "minecraft:stained_glass",
                        "minecraft:stained_glass_pane",
                        "minecraft:stained_hardened_clay",
                        "minecraft:standing_banner",
                        "minecraft:standing_sign",
                        "minecraft:stick",
                        "minecraft:sticky_piston",
                        "minecraft:stickypistonarmcollision",
                        "minecraft:stone",
                        "minecraft:stone_axe",
                        "minecraft:stone_brick_stairs",
                        "minecraft:stone_button",
                        "minecraft:stone_hoe",
                        "minecraft:stone_pickaxe",
                        "minecraft:stone_pressure_plate",
                        "minecraft:stone_shovel",
                        "minecraft:stone_stairs",
                        "minecraft:stone_sword",
                        "minecraft:stonebrick",
                        "minecraft:stonecutter",
                        "minecraft:stonecutter_block",
                        "minecraft:string",
                        "minecraft:stripped_acacia_log",
                        "minecraft:stripped_birch_log",
                        "minecraft:stripped_dark_oak_log",
                        "minecraft:stripped_jungle_log",
                        "minecraft:stripped_oak_log",
                        "minecraft:stripped_spruce_log",
                        "minecraft:structure_block",
                        "minecraft:structure_void",
                        "minecraft:sugar",
                        "minecraft:suspicious_stew",
                        "minecraft:sweet_berries",
                        "minecraft:sweet_berry_bush",
                        "minecraft:tallgrass",
                        "minecraft:tnt",
                        "minecraft:tnt_minecart",
                        "minecraft:torch",
                        "minecraft:totem",
                        "minecraft:trapdoor",
                        "minecraft:trapped_chest",
                        "minecraft:trident",
                        "minecraft:tripwire",
                        "minecraft:tripwire_hook",
                        "minecraft:turtle_egg",
                        "minecraft:turtle_helmet",
                        "minecraft:turtle_shell_piece",
                        "minecraft:underwater_torch",
                        "minecraft:undyed_shulker_box",
                        "minecraft:unlit_redstone_torch",
                        "minecraft:unpowered_comparator",
                        "minecraft:unpowered_repeater",
                        "minecraft:vine",
                        "minecraft:wall_banner",
                        "minecraft:wall_sign",
                        "minecraft:water",
                        "minecraft:waterlily",
                        "minecraft:web",
                        "minecraft:wheat",
                        "minecraft:wheat_seeds",
                        "minecraft:white_glazed_terracotta",
                        "minecraft:wither_rose",
                        "minecraft:wood",
                        "minecraft:wooden_axe",
                        "minecraft:wooden_button",
                        "minecraft:wooden_door",
                        "minecraft:wooden_hoe",
                        "minecraft:wooden_pickaxe",
                        "minecraft:wooden_pressure_plate",
                        "minecraft:wooden_shovel",
                        "minecraft:wooden_slab",
                        "minecraft:wooden_sword",
                        "minecraft:wool",
                        "minecraft:writable_book",
                        "minecraft:written_book",
                        "minecraft:yellow_flower",
                        "minecraft:yellow_glazed_terracotta"
                    ]
                },
                "blocks": {
                    "examples": [
                        "minecraft:acacia_button",
                        "minecraft:acacia_door",
                        "minecraft:acacia_fence_gate",
                        "minecraft:acacia_pressure_plate",
                        "minecraft:acacia_stairs",
                        "minecraft:acacia_standing_sign",
                        "minecraft:acacia_trapdoor",
                        "minecraft:acacia_wall_sign",
                        "minecraft:activator_rail",
                        "minecraft:air",
                        "minecraft:andesite_stairs",
                        "minecraft:anvil",
                        "minecraft:bamboo",
                        "minecraft:bamboo_sapling",
                        "minecraft:barrel",
                        "minecraft:barrier",
                        "minecraft:beacon",
                        "minecraft:bed",
                        "minecraft:bedrock",
                        "minecraft:beehive",
                        "minecraft:bee_nest",
                        "minecraft:beetroot",
                        "minecraft:bell",
                        "minecraft:birch_button",
                        "minecraft:birch_door",
                        "minecraft:birch_fence_gate",
                        "minecraft:birch_pressure_plate",
                        "minecraft:birch_stairs",
                        "minecraft:birch_standing_sign",
                        "minecraft:birch_trapdoor",
                        "minecraft:birch_wall_sign",
                        "minecraft:black_glazed_terracotta",
                        "minecraft:blast_furnace",
                        "minecraft:blue_glazed_terracotta",
                        "minecraft:blue_ice",
                        "minecraft:bone_block",
                        "minecraft:bookshelf",
                        "minecraft:brewing_stand",
                        "minecraft:brick_block",
                        "minecraft:brick_stairs",
                        "minecraft:brown_glazed_terracotta",
                        "minecraft:brown_mushroom",
                        "minecraft:brown_mushroom_block",
                        "minecraft:bubble_column",
                        "minecraft:cactus",
                        "minecraft:cake",
                        "minecraft:camera",
                        "minecraft:campfire",
                        "minecraft:carpet",
                        "minecraft:carrots",
                        "minecraft:cartography_table",
                        "minecraft:carved_pumpkin",
                        "minecraft:cauldron",
                        "minecraft:chain_command_block",
                        "minecraft:chemical_heat",
                        "minecraft:chemistry_table",
                        "minecraft:chest",
                        "minecraft:chorus_flower",
                        "minecraft:chorus_plant",
                        "minecraft:clay",
                        "minecraft:coal_block",
                        "minecraft:coal_ore",
                        "minecraft:cobblestone",
                        "minecraft:cobblestone_wall",
                        "minecraft:cocoa",
                        "minecraft:colored_torch_bp",
                        "minecraft:colored_torch_rg",
                        "minecraft:command_block",
                        "minecraft:composter",
                        "minecraft:concrete",
                        "minecraft:concretePowder",
                        "minecraft:conduit",
                        "minecraft:coral",
                        "minecraft:coral_block",
                        "minecraft:coral_fan",
                        "minecraft:coral_fan_dead",
                        "minecraft:coral_fan_hang",
                        "minecraft:coral_fan_hang2",
                        "minecraft:coral_fan_hang3",
                        "minecraft:crafting_table",
                        "minecraft:cyan_glazed_terracotta",
                        "minecraft:dark_oak_button",
                        "minecraft:dark_oak_door",
                        "minecraft:dark_oak_fence_gate",
                        "minecraft:dark_oak_pressure_plate",
                        "minecraft:dark_oak_stairs",
                        "minecraft:dark_oak_trapdoor",
                        "minecraft:dark_prismarine_stairs",
                        "minecraft:darkoak_standing_sign",
                        "minecraft:darkoak_wall_sign",
                        "minecraft:daylight_detector",
                        "minecraft:daylight_detector_inverted",
                        "minecraft:deadbush",
                        "minecraft:detector_rail",
                        "minecraft:diamond_block",
                        "minecraft:diamond_ore",
                        "minecraft:diorite_stairs",
                        "minecraft:dirt",
                        "minecraft:dispenser",
                        "minecraft:double_plant",
                        "minecraft:double_stone_slab",
                        "minecraft:double_stone_slab2",
                        "minecraft:double_stone_slab3",
                        "minecraft:double_stone_slab4",
                        "minecraft:double_wooden_slab",
                        "minecraft:dragon_egg",
                        "minecraft:dried_kelp_block",
                        "minecraft:dropper",
                        "minecraft:element_0",
                        "minecraft:element_1",
                        "minecraft:element_10",
                        "minecraft:element_100",
                        "minecraft:element_101",
                        "minecraft:element_102",
                        "minecraft:element_103",
                        "minecraft:element_104",
                        "minecraft:element_105",
                        "minecraft:element_106",
                        "minecraft:element_107",
                        "minecraft:element_108",
                        "minecraft:element_109",
                        "minecraft:element_11",
                        "minecraft:element_110",
                        "minecraft:element_111",
                        "minecraft:element_112",
                        "minecraft:element_113",
                        "minecraft:element_114",
                        "minecraft:element_115",
                        "minecraft:element_116",
                        "minecraft:element_117",
                        "minecraft:element_118",
                        "minecraft:element_12",
                        "minecraft:element_13",
                        "minecraft:element_14",
                        "minecraft:element_15",
                        "minecraft:element_16",
                        "minecraft:element_17",
                        "minecraft:element_18",
                        "minecraft:element_19",
                        "minecraft:element_2",
                        "minecraft:element_20",
                        "minecraft:element_21",
                        "minecraft:element_22",
                        "minecraft:element_23",
                        "minecraft:element_24",
                        "minecraft:element_25",
                        "minecraft:element_26",
                        "minecraft:element_27",
                        "minecraft:element_28",
                        "minecraft:element_29",
                        "minecraft:element_3",
                        "minecraft:element_30",
                        "minecraft:element_31",
                        "minecraft:element_32",
                        "minecraft:element_33",
                        "minecraft:element_34",
                        "minecraft:element_35",
                        "minecraft:element_36",
                        "minecraft:element_37",
                        "minecraft:element_38",
                        "minecraft:element_39",
                        "minecraft:element_4",
                        "minecraft:element_40",
                        "minecraft:element_41",
                        "minecraft:element_42",
                        "minecraft:element_43",
                        "minecraft:element_44",
                        "minecraft:element_45",
                        "minecraft:element_46",
                        "minecraft:element_47",
                        "minecraft:element_48",
                        "minecraft:element_49",
                        "minecraft:element_5",
                        "minecraft:element_50",
                        "minecraft:element_51",
                        "minecraft:element_52",
                        "minecraft:element_53",
                        "minecraft:element_54",
                        "minecraft:element_55",
                        "minecraft:element_56",
                        "minecraft:element_57",
                        "minecraft:element_58",
                        "minecraft:element_59",
                        "minecraft:element_6",
                        "minecraft:element_60",
                        "minecraft:element_61",
                        "minecraft:element_62",
                        "minecraft:element_63",
                        "minecraft:element_64",
                        "minecraft:element_65",
                        "minecraft:element_66",
                        "minecraft:element_67",
                        "minecraft:element_68",
                        "minecraft:element_69",
                        "minecraft:element_7",
                        "minecraft:element_70",
                        "minecraft:element_71",
                        "minecraft:element_72",
                        "minecraft:element_73",
                        "minecraft:element_74",
                        "minecraft:element_75",
                        "minecraft:element_76",
                        "minecraft:element_77",
                        "minecraft:element_78",
                        "minecraft:element_79",
                        "minecraft:element_8",
                        "minecraft:element_80",
                        "minecraft:element_81",
                        "minecraft:element_82",
                        "minecraft:element_83",
                        "minecraft:element_84",
                        "minecraft:element_85",
                        "minecraft:element_86",
                        "minecraft:element_87",
                        "minecraft:element_88",
                        "minecraft:element_89",
                        "minecraft:element_9",
                        "minecraft:element_90",
                        "minecraft:element_91",
                        "minecraft:element_92",
                        "minecraft:element_93",
                        "minecraft:element_94",
                        "minecraft:element_95",
                        "minecraft:element_96",
                        "minecraft:element_97",
                        "minecraft:element_98",
                        "minecraft:element_99",
                        "minecraft:emerald_block",
                        "minecraft:emerald_ore",
                        "minecraft:enchanting_table",
                        "minecraft:end_brick_stairs",
                        "minecraft:end_bricks",
                        "minecraft:end_gateway",
                        "minecraft:end_portal",
                        "minecraft:end_portal_frame",
                        "minecraft:end_rod",
                        "minecraft:end_stone",
                        "minecraft:ender_chest",
                        "minecraft:farmland",
                        "minecraft:fence",
                        "minecraft:fence_gate",
                        "minecraft:fire",
                        "minecraft:fletching_table",
                        "minecraft:flower_pot",
                        "minecraft:flowing_lava",
                        "minecraft:flowing_water",
                        "minecraft:frame",
                        "minecraft:frosted_ice",
                        "minecraft:furnace",
                        "minecraft:glass",
                        "minecraft:glass_pane",
                        "minecraft:glowingobsidian",
                        "minecraft:glowstone",
                        "minecraft:gold_block",
                        "minecraft:gold_ore",
                        "minecraft:golden_rail",
                        "minecraft:granite_stairs",
                        "minecraft:grass",
                        "minecraft:grass_path",
                        "minecraft:gravel",
                        "minecraft:gray_glazed_terracotta",
                        "minecraft:green_glazed_terracotta",
                        "minecraft:grindstone",
                        "minecraft:hard_glass",
                        "minecraft:hard_glass_pane",
                        "minecraft:hard_stained_glass",
                        "minecraft:hard_stained_glass_pane",
                        "minecraft:hardened_clay",
                        "minecraft:hay_block",
                        "minecraft:heavy_weighted_pressure_plate",
                        "minecraft:honey_block",
                        "minecraft:honeycomb_block",
                        "minecraft:hopper",
                        "minecraft:ice",
                        "minecraft:info_update",
                        "minecraft:info_update2",
                        "minecraft:invisibleBedrock",
                        "minecraft:iron_bars",
                        "minecraft:iron_block",
                        "minecraft:iron_door",
                        "minecraft:iron_ore",
                        "minecraft:iron_trapdoor",
                        "minecraft:jigsaw",
                        "minecraft:jukebox",
                        "minecraft:jungle_button",
                        "minecraft:jungle_door",
                        "minecraft:jungle_fence_gate",
                        "minecraft:jungle_pressure_plate",
                        "minecraft:jungle_stairs",
                        "minecraft:jungle_standing_sign",
                        "minecraft:jungle_trapdoor",
                        "minecraft:jungle_wall_sign",
                        "minecraft:kelp",
                        "minecraft:ladder",
                        "minecraft:lantern",
                        "minecraft:lapis_block",
                        "minecraft:lapis_ore",
                        "minecraft:lava",
                        "minecraft:lava_cauldron",
                        "minecraft:leaves",
                        "minecraft:leaves2",
                        "minecraft:lectern",
                        "minecraft:lever",
                        "minecraft:light_block",
                        "minecraft:light_blue_glazed_terracotta",
                        "minecraft:light_weighted_pressure_plate",
                        "minecraft:lime_glazed_terracotta",
                        "minecraft:lit_blast_furnace",
                        "minecraft:lit_furnace",
                        "minecraft:lit_pumpkin",
                        "minecraft:lit_redstone_lamp",
                        "minecraft:lit_redstone_ore",
                        "minecraft:lit_smoker",
                        "minecraft:log",
                        "minecraft:log2",
                        "minecraft:loom",
                        "minecraft:magenta_glazed_terracotta",
                        "minecraft:magma",
                        "minecraft:melon_block",
                        "minecraft:melon_stem",
                        "minecraft:mob_spawner",
                        "minecraft:monster_egg",
                        "minecraft:mossy_cobblestone",
                        "minecraft:mossy_cobblestone_stairs",
                        "minecraft:mossy_stone_brick_stairs",
                        "minecraft:movingBlock",
                        "minecraft:mycelium",
                        "minecraft:nether_brick",
                        "minecraft:nether_brick_fence",
                        "minecraft:nether_brick_stairs",
                        "minecraft:nether_wart",
                        "minecraft:nether_wart_block",
                        "minecraft:netherrack",
                        "minecraft:netherreactor",
                        "minecraft:normal_stone_stairs",
                        "minecraft:noteblock",
                        "minecraft:oak_stairs",
                        "minecraft:observer",
                        "minecraft:obsidian",
                        "minecraft:orange_glazed_terracotta",
                        "minecraft:packed_ice",
                        "minecraft:pink_glazed_terracotta",
                        "minecraft:piston",
                        "minecraft:pistonArmCollision",
                        "minecraft:planks",
                        "minecraft:podzol",
                        "minecraft:polished_andesite_stairs",
                        "minecraft:polished_diorite_stairs",
                        "minecraft:polished_granite_stairs",
                        "minecraft:portal",
                        "minecraft:potatoes",
                        "minecraft:powered_comparator",
                        "minecraft:powered_repeater",
                        "minecraft:prismarine",
                        "minecraft:prismarine_bricks_stairs",
                        "minecraft:prismarine_stairs",
                        "minecraft:pumpkin",
                        "minecraft:pumpkin_stem",
                        "minecraft:purple_glazed_terracotta",
                        "minecraft:purpur_block",
                        "minecraft:purpur_stairs",
                        "minecraft:quartz_block",
                        "minecraft:quartz_ore",
                        "minecraft:quartz_stairs",
                        "minecraft:rail",
                        "minecraft:red_flower",
                        "minecraft:red_glazed_terracotta",
                        "minecraft:red_mushroom",
                        "minecraft:red_mushroom_block",
                        "minecraft:red_nether_brick",
                        "minecraft:red_nether_brick_stairs",
                        "minecraft:red_sandstone",
                        "minecraft:red_sandstone_stairs",
                        "minecraft:redstone_block",
                        "minecraft:redstone_lamp",
                        "minecraft:redstone_ore",
                        "minecraft:redstone_torch",
                        "minecraft:redstone_wire",
                        "minecraft:reeds",
                        "minecraft:repeating_command_block",
                        "minecraft:reserved6",
                        "minecraft:sand",
                        "minecraft:sandstone",
                        "minecraft:sandstone_stairs",
                        "minecraft:sapling",
                        "minecraft:scaffolding",
                        "minecraft:seaLantern",
                        "minecraft:sea_pickle",
                        "minecraft:seagrass",
                        "minecraft:shulker_box",
                        "minecraft:silver_glazed_terracotta",
                        "minecraft:skull",
                        "minecraft:slime",
                        "minecraft:smithing_table",
                        "minecraft:smoker",
                        "minecraft:smooth_quartz_stairs",
                        "minecraft:smooth_red_sandstone_stairs",
                        "minecraft:smooth_sandstone_stairs",
                        "minecraft:smooth_stone",
                        "minecraft:snow",
                        "minecraft:snow_layer",
                        "minecraft:soul_sand",
                        "minecraft:sponge",
                        "minecraft:spruce_button",
                        "minecraft:spruce_door",
                        "minecraft:spruce_fence_gate",
                        "minecraft:spruce_pressure_plate",
                        "minecraft:spruce_stairs",
                        "minecraft:spruce_standing_sign",
                        "minecraft:spruce_trapdoor",
                        "minecraft:spruce_wall_sign",
                        "minecraft:stained_glass",
                        "minecraft:stained_glass_pane",
                        "minecraft:stained_hardened_clay",
                        "minecraft:standing_banner",
                        "minecraft:standing_sign",
                        "minecraft:stickyPistonArmCollision",
                        "minecraft:sticky_piston",
                        "minecraft:stone",
                        "minecraft:stone_brick_stairs",
                        "minecraft:stone_button",
                        "minecraft:stone_pressure_plate",
                        "minecraft:stone_slab",
                        "minecraft:stone_slab2",
                        "minecraft:stone_slab3",
                        "minecraft:stone_slab4",
                        "minecraft:stone_stairs",
                        "minecraft:stonebrick",
                        "minecraft:stonecutter",
                        "minecraft:stonecutter_block",
                        "minecraft:stripped_acacia_log",
                        "minecraft:stripped_birch_log",
                        "minecraft:stripped_dark_oak_log",
                        "minecraft:stripped_jungle_log",
                        "minecraft:stripped_oak_log",
                        "minecraft:stripped_spruce_log",
                        "minecraft:structure_block",
                        "minecraft:structure_void",
                        "minecraft:sweet_berry_bush",
                        "minecraft:tallgrass",
                        "minecraft:tnt",
                        "minecraft:torch",
                        "minecraft:trapdoor",
                        "minecraft:trapped_chest",
                        "minecraft:tripWire",
                        "minecraft:tripwire_hook",
                        "minecraft:turtle_egg",
                        "minecraft:underwater_torch",
                        "minecraft:undyed_shulker_box",
                        "minecraft:unlit_redstone_torch",
                        "minecraft:unpowered_comparator",
                        "minecraft:unpowered_repeater",
                        "minecraft:vine",
                        "minecraft:wall_banner",
                        "minecraft:wall_sign",
                        "minecraft:water",
                        "minecraft:waterlily",
                        "minecraft:web",
                        "minecraft:wheat",
                        "minecraft:white_glazed_terracotta",
                        "minecraft:wither_rose",
                        "minecraft:wood",
                        "minecraft:wooden_button",
                        "minecraft:wooden_door",
                        "minecraft:wooden_pressure_plate",
                        "minecraft:wooden_slab",
                        "minecraft:wool",
                        "minecraft:yellow_flower",
                        "minecraft:yellow_glazed_terracotta"
                    ]
                },
                "entities": {
                    "examples": [
                        "minecraft:agent",
                        "minecraft:area_effect_cloud",
                        "minecraft:armor_stand",
                        "minecraft:arrow",
                        "minecraft:balloon",
                        "minecraft:bat",
                        "minecraft:bee",
                        "minecraft:blaze",
                        "minecraft:boat",
                        "minecraft:cat",
                        "minecraft:cave_spider",
                        "minecraft:chest_minecart",
                        "minecraft:chicken",
                        "minecraft:cod",
                        "minecraft:command_block_minecart",
                        "minecraft:cow",
                        "minecraft:creeper",
                        "minecraft:dolphin",
                        "minecraft:donkey",
                        "minecraft:dragon_fireball",
                        "minecraft:drowned",
                        "minecraft:egg",
                        "minecraft:elder_guardian",
                        "minecraft:elder_guardian_ghost",
                        "minecraft:ender_crystal",
                        "minecraft:ender_dragon",
                        "minecraft:ender_pearl",
                        "minecraft:enderman",
                        "minecraft:endermite",
                        "minecraft:evocation_fang",
                        "minecraft:evocation_illager",
                        "minecraft:eye_of_ender_signal",
                        "minecraft:falling_block",
                        "minecraft:fireball",
                        "minecraft:fireworks_rocket",
                        "minecraft:fishing_hook",
                        "minecraft:fox",
                        "minecraft:ghast",
                        "minecraft:guardian",
                        "minecraft:hopper_minecart",
                        "minecraft:horse",
                        "minecraft:husk",
                        "minecraft:ice_bomb",
                        "minecraft:iron_golem",
                        "minecraft:item",
                        "minecraft:leash_knot",
                        "minecraft:lightning_bolt",
                        "minecraft:lingering_potion",
                        "minecraft:llama",
                        "minecraft:llama_spit",
                        "minecraft:magma_cube",
                        "minecraft:minecart",
                        "minecraft:mooshroom",
                        "minecraft:mule",
                        "minecraft:npc",
                        "minecraft:ocelot",
                        "minecraft:painting",
                        "minecraft:panda",
                        "minecraft:parrot",
                        "minecraft:phantom",
                        "minecraft:pig",
                        "minecraft:pillager",
                        "minecraft:player",
                        "minecraft:polar_bear",
                        "minecraft:pufferfish",
                        "minecraft:rabbit",
                        "minecraft:ravager",
                        "minecraft:salmon",
                        "minecraft:sheep",
                        "minecraft:shulker",
                        "minecraft:shulker_bullet",
                        "minecraft:silverfish",
                        "minecraft:skeleton",
                        "minecraft:skeleton_horse",
                        "minecraft:slime",
                        "minecraft:small_fireball",
                        "minecraft:snow_golem",
                        "minecraft:snowball",
                        "minecraft:spider",
                        "minecraft:splash_potion",
                        "minecraft:squid",
                        "minecraft:stray",
                        "minecraft:thrown_trident",
                        "minecraft:tnt",
                        "minecraft:tnt_minecart",
                        "minecraft:tripod_camera",
                        "minecraft:tropicalfish",
                        "minecraft:turtle",
                        "minecraft:vex",
                        "minecraft:villager",
                        "minecraft:villager_v2",
                        "minecraft:vindicator",
                        "minecraft:wandering_trader",
                        "minecraft:witch",
                        "minecraft:wither",
                        "minecraft:wither_skeleton",
                        "minecraft:wither_skull",
                        "minecraft:wither_skull_dangerous",
                        "minecraft:wolf",
                        "minecraft:xp_bottle",
                        "minecraft:xp_orb",
                        "minecraft:zombie",
                        "minecraft:zombie_horse",
                        "minecraft:zombie_pigman",
                        "minecraft:zombie_villager",
                        "minecraft:zombie_villager_v2"
                    ]
                },
                "effects": {
                    "enum": [
                        "speed",
                        "slowness",
                        "haste",
                        "mining_fatigue",
                        "strength",
                        "instant_health",
                        "instant_damage",
                        "jump_boost",
                        "nausea",
                        "regeneration",
                        "resistance",
                        "fire_resistance",
                        "water_breathing",
                        "invisibility",
                        "blindness",
                        "night_vision",
                        "hunger",
                        "weakness",
                        "poison",
                        "wither",
                        "health_boost",
                        "absorption",
                        "saturation",
                        "levitation",
                        "fatal_poison",
                        "conduit_power",
                        "slow_falling",
                        "bad_omen",
                        "village_hero"
                    ]
                },
                "difficulties": {
                    "enum": [
                        "peaceful",
                        "easy",
                        "normal",
                        "hard"
                    ]
                },
                "components": {
                    "properties": {
                        "minecraft:annotation.break_door": {
                            "type": "object",
                            "properties": {
                                "break_time": {
                                    "type": "decimal",
                                    "default": 12.0,
                                    "description": "The time in seconds required to break through doors."
                                },
                                "min_difficulty": {
                                    "type": "string",
                                    "default": "hard",
                                    "$ref": "#/definitions/library/difficulties",
                                    "description": "The minimum difficulty that the world must be on for this entity to break doors."
                                }
                            },
                            "description": "Allows the actor to break doors assuming that that flags set up for the component to use in navigation."
                        },
                        "minecraft:annotation.open_door": {
                            "type": "object"
                        },
                        "minecraft:behavior.hide": {
                            "type": "object",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "poi_type": { "$ref": "#/definitions/library/components/values/poi_type" },
                                "duration": { "$ref": "#/definitions/library/components/values/duration" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" },
                                "timeout_cooldown": { "$ref": "#/definitions/library/components/values/timeout_cooldown" }
                            },
                            "description": "Allows a mob with the hide component to attempt to move to - and hide at - an owned or nearby POI."
                        },
                        "minecraft:behavior.move_to_poi": {
                            "type": "object",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "poi_type": { "$ref": "#/definitions/library/components/values/poi_type" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" }
                            },
                            "description": "Allows the mob to move to a POI if able to"
                        },
                        "minecraft:behavior.scared": {
                            "type": "object",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "sound_interval": { "type": "integer", "default": 0, "description": "The interval in which a sound will play when active in a 1/delay chance to kick off" }
                            },
                            "description": "Allows the a mob to become scared when the weather outside is thundering"
                        },
                        "minecraft:behavior.work": {
                            "type": "object",
                            "description": "allows the NPC to use their jobsite POI",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "active_time": { "type": "integer", "default": 0, "description": "The amount of ticks the NPC will stay in their the work location" },
                                "can_work_in_rain": { "type": "boolean", "default": false, "description": "If true, this entity can work when their jobsite POI is being rained on." },
                                "goal_cooldown": { "type": "integer", "default": 0, "description": "The amount of ticks the goal will be on cooldown before it can be used again" },
                                "on_arrival": { "type": "object", "$ref": "#/definitions/library/components/values/trigger", "description": "Event to run when the mob reaches their jobsite and finishes working." },
                                "sound_delay_max": { "type": "integer", "default": 0, "description": "The max interval in which a sound will play" },
                                "sound_delay_min": { "type": "integer", "default": 0, "description": "The min interval in which a sound will play" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" },
                                "work_in_rain_tolerance": { "type": "integer", "default": -1, "description": "If \"can_work_in_rain\" is false, this is the maximum number of ticks left in the goal where rain will not interrupt the goal" }
                            }
                        },
                        "minecraft:behavior.avoid_mob_type": {
                            "type": "object",
                            "description": "Allows the mob to target another mob that hurts an entity it trusts.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "entity_types": { "$ref": "#/definitions/library/components/values/entity_types" },
                                "ignore_visibility": { "type": "boolean", "default": false, "description": "If true, visbility between this entity and the mob type will not be checked" },
                                "max_dist": { "type": "number", "default": 0.0, "description": "Maximum distance to look for an entity" },
                                "max_flee": { "type": "number", "default": 0.5, "description": "Distance in blocks within the mob considers it should stop fleeing" },
                                "probability_per_strength": { "type": "number", "description": "Determines how likely it is that this entity will stop avoiding another entity based on that entity's strength" },
                                "sprint_speed_multiplier": { "type": "number", "default": 1.0, "description": "Multiplier for running speed. 1.0 means keep the regular speed, while higher numbers make the running speed faster" },
                                "walk_speed_multiplier": { "type": "number", "default": 1.0, "description": "Multiplier for walking speed. 1.0 means keep the regular speed, while higher numbers make the walking speed faster" }
                            }
                        },
                        "minecraft:behavior.beg": {
                            "type": "object",
                            "description": "Allows this mob to look at and follow the player that holds food they like.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "items": { "$ref": "#/definitions/library/components/values/items", "description": "List of items that this mob likes" },
                                "look_distance": { "$ref": "#/definitions/library/components/values/look_distance" },
                                "look_time": { "$ref": "#/definitions/library/components/values/look_time" }
                            }
                        },
                        "minecraft:behavior.break_door": {
                            "type": "object",
                            "description": "Allows this mob to break doors.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" }
                            }
                        },
                        "minecraft:behavior.breed": {
                            "type": "object",
                            "description": "Allows this mob to breed with other mobs.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" }
                            }
                        },
                        "minecraft:behavior.celebrate": {
                            "type": "object",
                            "description": "This allows the mob celebrate by jumping up and playing a sound periodically.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "celebration_sound": { "type": "string", "description": "The sound to occasionally play." },
                                "duration": { "type": "number", "default": 1, "description": "The sound to occasionally play." },
                                "jump_interval": { "type": "array", "description": "The range of time in seconds to randomly wait before jumping again." },
                                "on_celebration_end_event": { "type": "object", "$ref": "#/definitions/library/components/values/trigger", "description": "The event to trigger when the goal's duration expires." },
                                "sound_interval": { "type": "array", "description": "The range of time in seconds to randomly wait before playing the sound again." }
                            }
                        },
                        "minecraft:behavior.charge_attack": {
                            "type": "object",
                            "description": "Allows the mob to attack its target by running at it.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" }
                            }
                        },
                        "minecraft:behavior.charge_held_item": {
                            "type": "object",
                            "description": "Allows this mob to charge and use their held item.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "items": { "$ref": "#/definitions/library/components/values/items", "description": "The list of items that can be used to charge the held item." }
                            }
                        },
                        "minecraft:behavior.circle_around_anchor": {
                            "type": "object",
                            "description": "Allows the mob to move in a circle around a point or a target.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "goal_radius": { "$ref": "#/definitions/library/components/values/goal_radius" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" },
                                "height_above_target_range": { "type": "array", "default": [ 0.0, 0.0 ], "description": "When the mob finds a target, the range of height in blocks above the target to start the anchor point." },
                                "height_offset_range": { "type": "array", "default": [ 0.0, 0.0 ], "description": "The range of height in blocks offset the mob can have from it's anchor point." },
                                "radius_range": { "type": "array", "default": [ 5.0, 15.0 ], "description": "Range of radius in blocks of the circle to move around." },
                                "height_change_chance": { "type": "number", "default": 350, "description": "A random value to determine when to change the height of the mob from the anchor point. This has a 1/value chance every tick to do so." },
                                "radius_change_chance": { "type": "number", "default": 250, "description": "A random value to determine when to increase the size of the radius up to the maximum. This has a 1/value chance every tick to do so." }
                            }
                        },
                        "minecraft:behavior.controlled_by_player": {
                            "type": "object",
                            "description": "Allows the mob to be controlled by the player.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" }
                            }
                        },
                        "minecraft:behavior.defend_trusted_target": {
                            "type": "object",
                            "description": "Allows the mob to target another mob that hurts an entity it trusts.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "aggro_sound": { "type": "string", "description": "Sound to occasionally play while defending" },
                                "attack_interval": { "type": "integer", "default": 0, "description": "Time in seconds between attacks" },
                                "entity_types": { "$ref": "#/definitions/library/components/values/entity_types", "description": "List of entity types this mob avoids." },
                                "must_see": { "type": "integer", "default": 0, "description": "The amount of ticks the goal will be on cooldown before it can be used again" },
                                "must_see_forget_duration": { "type": "object", "$ref": "#/definitions/library/components/values/trigger", "description": "Event to run when the mob reaches their jobsite and finishes working." },
                                "within_radius": { "type": "integer", "default": 0, "description": "The max interval in which a sound will play" },
                                "sound_delay_min": { "type": "integer", "default": 0, "description": "The min interval in which a sound will play" }
                            }
                        },
                        "minecraft:behavior.defend_village_target": {
                            "type": "object",
                            "description": "Allows the mob to stay in the village and fight mobs hostile to the villagers.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "entity_types": { "$ref": "#/definitions/library/components/values/entity_types", "description": "List of entity types this mob considers a threat to the village" }
                            }
                        },
                        "minecraft:behavior.delayed_attack": {
                            "type": "object",
                            "description": "Allows the mob to an attack where the hit is delayed.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" },
                                "attack_duration": { "type": "number", "default": 0.75, "description": "The entity's attack animation will play out over this duration (in seconds). Also controls attack cooldown." },
                                "attack_once": { "$ref": "#/definitions/library/components/values/attack_once" },
                                "attack_types": { "$ref": "#/definitions/library/components/values/attack_types" },
                                "cooldown_time": { "$ref": "#/definitions/library/components/values/cooldown_time", "description": "Cooldown time (in seconds) between attacks." },
                                "hit_delay_pct": { "type": "number", "default": 0.5, "description": "The percentage into the attack animation to apply the damage of the attack (1.0 = 100%)." },
                                "inner_boundary_time_increase": { "$ref": "#/definitions/library/components/values/inner_boundary_time_increase" },
                                "max_path_time": { "$ref": "#/definitions/library/components/values/max_path_time" },
                                "melee_fov": { "$ref": "#/definitions/library/components/values/melee_fov" },
                                "min_path_time": { "$ref": "#/definitions/library/components/values/min_path_time" },
                                "on_attack": { "$ref": "#/definitions/library/components/values/on_attack" },
                                "outer_boundary_time_increase": { "$ref": "#/definitions/library/components/values/outer_boundary_time_increase" },
                                "path_fail_time_increase": { "$ref": "#/definitions/library/components/values/path_fail_time_increase" },
                                "path_inner_boundary": { "$ref": "#/definitions/library/components/values/path_inner_boundary" },
                                "path_outer_boundary": { "$ref": "#/definitions/library/components/values/path_outer_boundary" },
                                "random_stop_interval": { "$ref": "#/definitions/library/components/values/random_stop_interval" },
                                "reach_multiplier": { "$ref": "#/definitions/library/components/values/reach_multiplier" },
                                "require_complete_path": { "$ref": "#/definitions/library/components/values/require_complete_path" },
                                "track_target": { "$ref": "#/definitions/library/components/values/track_target" },
                                "x_max_rotation": { "$ref": "#/definitions/library/components/values/x_max_rotation" },
                                "y_max_head_rotation": { "$ref": "#/definitions/library/components/values/y_max_head_rotation" }
                            }
                        },
                        "minecraft:behavior.door_interact": {
                            "type": "object",
                            "description": "Allows the mob to open and close doors.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" }
                            }
                        },
                        "minecraft:behavior.dragondeath": {
                            "type": "object",
                            "description": "Allows the dragon to go out with glory. This controls the Ender Dragon's death animation and can't be used by other mobs.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" }
                            }
                        },
                        "minecraft:behavior.dragonholdingpattern": {
                            "type": "object",
                            "description": "Allows the Dragon to fly around in a circle around the center podium. Can only be used by the Ender Dragon.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" }
                            }
                        },
                        "minecraft:behavior.dragonlanding": {
                            "type": "object",
                            "description": "Allows the Dragon to stop flying and transition into perching mode. Can only be used by the Ender Dragon.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" }
                            }
                        },
                        "minecraft:behavior.dragonscanning": {
                            "type": "object",
                            "description": "Allows the dragon to look around for a player to attack while in perch mode. Can only be used by the Ender Dragon.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" }
                            }
                        },
                        "minecraft:behavior.dragontakeoff": {
                            "type": "object",
                            "description": "Allows the dragon to leave perch mode and go back to flying around. Can only be used by the Ender Dragon.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" }
                            }
                        },
                        "minecraft:behavior.drink_potion": {
                            "type": "object",
                            "description": "Allows the mob to drink potions based on specified environment conditions.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "speed_modifier": { "type": "number", "default": 0.0 },
                                "potions": { "type": "array", "items": { "type": "object", "description": "A list of potions that this entity can drink.", "properties": {
                                            "chance": { "type": "number", "default": 1.0, "description": "The percent chance (from 0.0 to 1.0) of this potion being selected when searching for a potion to use." },
                                            "filter": { "$ref": "#/definitions/filters", "description": "The filters to use when determining if this potion can be selected." },
                                            "id": { "type": "integer", "default": -1, "description": "The registry ID of the potion to use" }
                                        } } }
                            }
                        },
                        "minecraft:behavior.drop_item_for": {
                            "type": "object",
                            "description": "Allows the mob to move near a target and drop an item.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "drop_item_chance": { "type": "number", "default": 1.0, "description": "The probability that the mob will drop an item." },
                                "entity_types": { "$ref": "#/definitions/library/components/values/entity_types", "description": "List of entity types this mob will drop items for." },
                                "goal_radius": { "$ref": "#/definitions/library/components/values/goal_radius" },
                                "loot_table": { "$ref": "#/definitions/library/components/values/loot_table", "description": "Loot table to select items from." },
                                "max_dist": { "$ref": "#/definitions/library/components/values/max_dist", "description": "Maximum distance in blocks this mob will look for entities to drop an item for." },
                                "offering_distance": { "type": "number", "default": 1.0, "description": "The distance in blocks the mob will try to be away from the entity when it drops the item." },
                                "on_drop_attempt": { "$ref": "#/definitions/library/components/values/trigger", "description": "Event to run when this mob attempts to drop an item." },
                                "search_height": { "$ref": "#/definitions/library/components/values/search_height", "description": "Height in blocks from the target the mob can be." },
                                "search_range": { "$ref": "#/definitions/library/components/values/search_range", "description": "The distance in blocks from the target the mob can be." },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" },
                                "time_of_day_range": {
                                    "type": "array",
                                    "items": { "type": "number" },
                                    "minItems": 2,
                                    "maxItems": 2,
                                    "default": [0, 1],
                                    "description": "The valid times of day that this goal can be used. For reference: noon is 0.0, sunset is 0.25, midnight is 0.5, and sunrise is 0.75, and back to noon for 1.0."
                                }
                            }
                        },
                        "minecraft:behavior.eat_block": {
                            "type": "object",
                            "description": "Allows the mob to eat a block (for example, sheep eating grass).",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "on_eat": { "$ref": "#/definitions/library/components/values/trigger", "description": "Trigger to fire when the mob eats a block of grass" },
                                "delay_before_eating": { "$type": "number", "description": "Time in seconds the mob should wait before eating the item." }
                            }
                        },
                        "minecraft:behavior.eat_carried_item": {
                            "type": "object",
                            "description": "If the mob is carrying a food item, the mob will eat it and the effects will be applied to the mob.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" }
                            }
                        },
                        "minecraft:behavior.enderman_leave_block": {
                            "type": "object",
                            "description": "Allows the enderman to drop a block they are carrying. Can only be used by Endermen.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" }
                            }
                        },
                        "minecraft:behavior.enderman_take_block": {
                            "type": "object",
                            "description": "Allows the enderman to take a block and carry it around. Can only be used by Endermen.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" }
                            }
                        },
                        "minecraft:behavior.explore_outskirts": {
                            "type": "object",
                            "description": "Allows a mob to explore the outskirts of a village",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "explore_dist": { "type": "number", "default": 5, "description": "The distance in which the mob will proceed past the village bounds" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" },
                                "wait_time": { "type": "integer", "default": 0, "description": "The time the mob will stand around 'searching' for POIs" }
                            }
                        },
                        "minecraft:behavior.find_cover": {
                            "type": "object",
                            "description": "Allows the mob to seek shade.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" },
                                "cooldown_time": { "$ref": "#/definitions/library/components/values/cooldown_time" }
                            }
                        },
                        "minecraft:behavior.find_mount": {
                            "type": "object",
                            "description": "Allows the mob to look around for another mob to ride atop it.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "avoid_water": { "$ref": "#/definitions/library/components/values/avoid_water", "description": "f true, the mob will not go into water blocks when going towards a mount" },
                                "mount_distance": {
                                    "type": "number",
                                    "default": -1.0,
                                    "description": "This is the distance the mob needs to be, in blocks, from the desired mount to mount it. If the value is below 0, the mob will use its default attack distance"
                                },
                                "start_delay": { "type": "integer", "default": 0, "description": "Time the mob will wait before starting to move towards the mount" },
                                "target_needed": { "type": "boolean", "default": false, "description": "If true, the mob will only look for a mount if it has a target" },
                                "within_radius": { "$ref": "#/definitions/library/components/values/within_radius", "description": "Distance in blocks within which the mob will look for a mount" }
                            }
                        },
                        "minecraft:behavior.find_underwater_treasure": {
                            "type": "object",
                            "description": "Allows the mob to move towards the nearest underwater ruin or shipwreck.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "search_range": {
                                    "$ref": "#/definitions/library/components/values/search_range",
                                    "description": "The range that the mob will search for a treasure chest within a ruin or shipwreck to move towards."
                                },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" },
                                "stop_distance": { "$ref": "#/definitions/library/components/values/stop_distance", "description": "The distance the mob will move before stopping." }
                            }
                        },
                        "minecraft:behavior.flee_sun": {
                            "type": "object",
                            "description": "Allows the mob to run away from direct sunlight and seek shade.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" }
                            }
                        },
                        "minecraft:behavior.float": {
                            "type": "object",
                            "description": "Allows the mob to stay afloat while swimming.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" }
                            }
                        },
                        "minecraft:behavior.float_wander": {
                            "type": "object",
                            "description": "Allows the mob to float around like the Ghast.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "float_duration": { "type": "array", "default": [0, 0], "description": "Range of time in seconds the mob will float around before landing and choosing to do something else" },
                                "must_reach": { "$ref": "#/definitions/library/components/values/must_reach", "description": "Allows the entity to track the attack target, even if the entity has no sensing." },
                                "random_reselect": { "type": "boolean", "default": false, "description": "If true, the mob will randomly pick a new point while moving to the previously selected one" },
                                "xz_dist": { "$ref": "#/definitions/library/components/values/xz_dist" },
                                "y_dist": { "$ref": "#/definitions/library/components/values/y_dist" },
                                "y_offset": { "$ref": "#/definitions/library/components/values/y_offset" }
                            }
                        },
                        "minecraft:behavior.follow_caravan": {
                            "type": "object",
                            "description": "Allows the mob to follow mobs that are in a caravan.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" },
                                "entity_count": { "type": "integer", "default": 1, "description": "Number of entities that can be in the caravan" },
                                "entity_types": { "$ref": "#/definitions/library/components/values/entity_types", "description": "List of entity types that this mob can follow in a caravan" }
                            }
                        },
                        "minecraft:behavior.follow_mob": {
                            "type": "object",
                            "description": "Allows the mob to follow other mobs.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "stop_distance": { "$ref": "#/definitions/library/components/values/stop_distance", "description": "The distance in blocks this mob stops from the mob it is following" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" },
                                "search_range": { "$ref": "#/definitions/library/components/values/search_range", "description": "The distance in blocks it will look for a mob to follow." }
                            }
                        },
                        "minecraft:behavior.follow_owner": {
                            "type": "object",
                            "description": "Allows the mob to follow the player that owns them.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "start_distance": { "$ref": "#/definitions/library/components/values/start_distance", "description": "The distance in blocks that the owner can be away from this mob before it starts following it" },
                                "stop_distance": { "$ref": "#/definitions/library/components/values/stop_distance", "description": "The distance in blocks this mob will stop from its owner while following it" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" }
                            }
                        },
                        "minecraft:behavior.follow_parent": {
                            "type": "object",
                            "description": "Allows the mob to follow their parent around.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" }
                            }
                        },
                        "minecraft:behavior.follow_target_captain": {
                            "type": "object",
                            "description": "Allows mob to move towards its current target captain.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "follow_distance": { "type": "number", "default": 0.0, "description": "Defines the distance in blocks the mob will stay from its target while following." },
                                "within_radius": {
                                    "$ref": "#/definitions/library/components/values/within_radius",
                                    "description": "Defines the maximum distance in blocks a mob can get from its target captain before giving up trying to follow it."
                                }
                            }
                        },
                        "minecraft:behavior.go_home": {
                            "type": "object",
                            "description": "Allows the mob to move back to the position they were spawned.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "goal_radius": { "$ref": "#/definitions/library/components/values/goal_radius" },
                                "interval": { "$ref": "#/definitions/library/components/values/interval" },
                                "on_home": { "$ref": "#/definitions/library/components/values/trigger", "description": "Event to run when this mob gets home." },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" }
                            }
                        },
                        "minecraft:behavior.guardian_attack": {
                            "type": "object"
                        },
                        "minecraft:behavior.harvest_farm_block": {
                            "type": "object",
                            "description": "Allows the villager to harvest nearby farms. Can only be used by Villagers.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" }
                            }
                        },
                        "minecraft:behavior.hold_ground": {
                            "type": "object",
                            "description": "The mob freezes and looks at the mob they are targeting.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "broadcast": { "$ref": "#/definitions/library/components/values/broadcast", "description": "Whether to broadcast out the mob's target to other mobs of the same type." },
                                "broadcast_range": { "type": "number", "default": 0.0, "description": "Range in blocks for how far to broadcast." },
                                "min_radius": { "type": "number", "default": 10.0, "description": "Minimum distance the target must be for the mob to run this goal." },
                                "within_radius_event": { "type": "string", "description": "Event to run when target is within the radius. This event is broadcasted if broadcast is true." }
                            }
                        },
                        "minecraft:behavior.hurt_by_target": {
                            "type": "object",
                            "description": "Allows the mob to target another mob that hurts them.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "alert_same_type": { "type": "boolean", "default": false, "description": "If true, nearby mobs of the same type will be alerted about the damage" },
                                "entity_types": { "$ref": "#/definitions/library/components/values/entity_types", "description": "List of entity types that this mob can target when hurt by them" },
                                "hurt_owner": { "type": "boolean", "default": false, "description": "If true, the mob will hurt its owner and other mobs with the same owner as itself" }
                            }
                        },
                        "minecraft:behavior.inspect_bookshelf": {
                            "type": "object",
                            "description": "Allows the mob to inspect bookshelves.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "goal_radius": { "$ref": "#/definitions/library/components/values/goal_radius" },
                                "search_count": { "$ref": "#/definitions/library/components/values/search_count" },
                                "search_height": { "$ref": "#/definitions/library/components/values/search_height", "description": "The height that the mob will search for bookshelves" },
                                "search_range": { "$ref": "#/definitions/library/components/values/search_range", "description": "Distance in blocks the mob will look for books to inspect"  },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" }
                            }
                        },
                        "minecraft:behavior.knockback_roar": {
                            "type": "object",
                            "description": "Allows the mob to perform a damaging knockback that affects all nearby entities.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "on_roar_end": { "$ref": "#/definitions/library/components/values/trigger", "description": "Event to trigger when the knockback roar is complete." },
                                "attack_time": { "type": "number", "default": 0.5, "description": "The delay after which the knockback occurs (in seconds)." },
                                "cooldown_time": { "$ref": "#/definitions/library/components/values/cooldown_time" },
                                "duration": { "$ref": "#/definitions/library/components/values/duration", "description": "The duration of the roar (in seconds)." },
                                "knockback_damage": { "type": "integer", "default": 6, "description": "The damage dealt by the knockback roar." },
                                "knockback_range": { "type": "integer", "default": 6, "description": "The radius (in blocks) of the knockback effect." },
                                "knockback_strength": { "type": "integer", "default": 6, "description": "The strength of the knockback." }
                            }
                        },
                        "minecraft:behavior.lay_down": {
                            "type": "object",
                            "description": "Allows mobs to lay down at times",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "interval": { "type": "number", "default": 120, "description": "A random value to determine at what intervals something can occur. This has a 1/interval chance to choose this goal" },
                                "random_stop_interval": { "type": "number", "default": 120, "description": "A random value in which the goal can use to pull out of the behavior. This is a 1/interval chance to play the sound" }
                            }
                        },
                        "minecraft:behavior.lay_egg": {
                            "type": "object",
                            "description": "Allows the mob to lay an egg block on a sand block if the mob is pregnant.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "goal_radius": { "$ref": "#/definitions/library/components/values/goal_radius" },
                                "on_lay": { "$ref": "#/definitions/library/components/values/trigger", "description": "Event to run when this mob lays the egg." },
                                "search_height": { "$ref": "#/definitions/library/components/values/search_height", "description": "Height in blocks the mob will look for sand block to move towards" },
                                "search_range": { "$ref": "#/definitions/library/components/values/search_range", "description": "The distance in blocks it will look for a sand block to move towards" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" }
                            }
                        },
                        "minecraft:behavior.leap_at_target": {
                            "type": "object",
                            "description": "Allows monsters to jump at and attack their target. Can only be used by hostile mobs.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "must_be_on_ground": { "type": "boolean", "default": true, "description": "If true, the mob will only jump at its target if its on the ground. Setting it to false will allow it to jump even if its already in the air" },
                                "set_persistent": { "$ref": "#/definitions/library/components/values/set_persistent" },
                                "yd": { "type": "decimal", "default": 0.0, "description": "The height in blocks the mob jumps when leaping at its target" }
                            }
                        },
                        "minecraft:behavior.look_at_entity": {
                            "type": "object",
                            "description": "Allows the mob to look at nearby entities.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "angle_of_view_horizontal": { "$ref": "#/definitions/library/components/values/angle_of_view_horizontal" },
                                "angle_of_view_vertical": { "$ref": "#/definitions/library/components/values/angle_of_view_vertical" },
                                "filters": { "$ref": "#/definitions/filters", "description": "Filter to determine the conditions for this mob to look at the entity" },
                                "look_distance": { "$ref": "#/definitions/library/components/values/look_distance" },
                                "look_time": { "$ref": "#/definitions/library/components/values/look_time" },
                                "probability": { "$ref": "#/definitions/library/components/values/probability" }
                            }
                        },
                        "minecraft:behavior.look_at_player": {
                            "type": "object",
                            "description": "Allows the mob to look at the player when the player is nearby.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "angle_of_view_horizontal": { "$ref": "#/definitions/library/components/values/angle_of_view_horizontal" },
                                "angle_of_view_vertical": { "$ref": "#/definitions/library/components/values/angle_of_view_vertical" },
                                "look_distance": { "$ref": "#/definitions/library/components/values/look_distance" },
                                "look_time": { "$ref": "#/definitions/library/components/values/look_time" },
                                "probability": { "$ref": "#/definitions/library/components/values/probability" }
                            }
                        },
                        "minecraft:behavior.look_at_target": {
                            "type": "object",
                            "description": "Allows the mob to look at the entity they are targetting.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "angle_of_view_horizontal": { "$ref": "#/definitions/library/components/values/angle_of_view_horizontal" },
                                "angle_of_view_vertical": { "$ref": "#/definitions/library/components/values/angle_of_view_vertical" },
                                "look_distance": { "$ref": "#/definitions/library/components/values/look_distance" },
                                "look_time": { "$ref": "#/definitions/library/components/values/look_time" },
                                "probability": { "$ref": "#/definitions/library/components/values/probability" }
                            }
                        },
                        "minecraft:behavior.look_at_trading_player": {
                            "type": "object",
                            "description": "Allows the mob to look at the player they are trading with.",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "angle_of_view_horizontal": { "$ref": "#/definitions/library/components/values/angle_of_view_horizontal" },
                                "angle_of_view_vertical": { "$ref": "#/definitions/library/components/values/angle_of_view_vertical" },
                                "look_distance": { "$ref": "#/definitions/library/components/values/look_distance" },
                                "look_time": { "$ref": "#/definitions/library/components/values/look_time" },
                                "probability": { "$ref": "#/definitions/library/components/values/probability" }
                            }
                        },
                        "minecraft:behavior.make_love": {
                            "description": "Allows the villager to look for a mate to spawn other villagers with. Can only be used by Villagers.",
                            "type": "object",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" }
                            }
                        },
                        "minecraft:behavior.melee_attack": {
                            "description": "Allows an entity to go to the village bell and mingle with other entities",
                            "type": "object",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" },
                                "attack_once": { "$ref": "#/definitions/library/components/values/attack_once" },
                                "attack_types": { "$ref": "#/definitions/library/components/values/attack_types" },
                                "cooldown_time": { "$ref": "#/definitions/library/components/values/cooldown_time", "description": "Cooldown time (in seconds) between attacks." },
                                "inner_boundary_time_increase": { "$ref": "#/definitions/library/components/values/inner_boundary_time_increase" },
                                "max_path_time": { "$ref": "#/definitions/library/components/values/max_path_time" },
                                "melee_fov": { "$ref": "#/definitions/library/components/values/melee_fov" },
                                "min_path_time": { "$ref": "#/definitions/library/components/values/min_path_time" },
                                "on_attack": { "$ref": "#/definitions/library/components/values/on_attack" },
                                "outer_boundary_time_increase": { "$ref": "#/definitions/library/components/values/outer_boundary_time_increase" },
                                "path_fail_time_increase": { "$ref": "#/definitions/library/components/values/path_fail_time_increase" },
                                "path_inner_boundary": { "$ref": "#/definitions/library/components/values/path_inner_boundary" },
                                "path_outer_boundary": { "$ref": "#/definitions/library/components/values/path_outer_boundary" },
                                "random_stop_interval": { "$ref": "#/definitions/library/components/values/random_stop_interval" },
                                "reach_multiplier": { "$ref": "#/definitions/library/components/values/reach_multiplier" },
                                "require_complete_path": { "$ref": "#/definitions/library/components/values/require_complete_path" },
                                "track_target": { "$ref": "#/definitions/library/components/values/track_target" },
                                "x_max_rotation": { "$ref": "#/definitions/library/components/values/x_max_rotation" },
                                "y_max_head_rotation": { "$ref": "#/definitions/library/components/values/y_max_head_rotation" }
                            }
                        },
                        "minecraft:behavior.mingle": {
                            "description": "Allows an entity to go to the village bell and mingle with other entities",
                            "type": "object",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "duration": { "$ref": "#/definitions/library/components/values/duration", "description": "Amount of time in seconds that the entity will chat with another entity" },
                                "mingle_distance": { "type": "number", "default": 2.0, "description": "The distance from its partner that this entity will mingle. If the entity type is not the same as the entity, this value needs to be identical on both entities." },
                                "mingle_partner_type": { "type": "list", "description": "The entity type that this entity is allowed to mingle with" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" }
                            }
                        },
                        "minecraft:behavior.mount_pathing": {
                            "description": "llows the mob to move around on its own while mounted seeking a target to attack.",
                            "type": "object",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" },
                                "target_dist": { "$ref": "#/definitions/library/components/values/target_dist", "description": "The distance at which this mob wants to be away from its target" },
                                "track_target": { "$ref": "#/definitions/library/components/values/track_target" }
                            }
                        },
                        "minecraft:behavior.move_indoors": {
                            "description": "Can only be used by Villagers. Allows them to seek shelter indoors.",
                            "type": "object",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" },
                                "timeout_cooldown": { "$ref": "#/definitions/library/components/values/timeout_cooldown" }
                            }
                        },
                        "minecraft:behavior.move_through_village": {
                            "description": "Can only be used by Villagers. Allows the villagers to create paths around the village.",
                            "type": "object",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "only_at_night": { "type": "boolean", "default": false, "description": "The height in blocks the mob jumps when leaping at its target" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" }
                            }
                        },
                        "minecraft:behavior.move_to_land": {
                            "description": "Allows the mob to move back onto land when in water.",
                            "type": "object",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "goal_radius": { "$ref": "#/definitions/library/components/values/goal_radius" },
                                "search_count": { "$ref": "#/definitions/library/components/values/search_count" },
                                "search_height": { "$ref": "#/definitions/library/components/values/search_height", "description": "Height in blocks the mob will look for land to move towards" },
                                "search_range": { "$ref": "#/definitions/library/components/values/search_range", "description": "The distance in blocks it will look for land to move towards" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" }
                            }
                        },
                        "minecraft:behavior.move_to_lava": {
                            "description": "Allows the mob to move back into lava when on land.",
                            "type": "object",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "goal_radius": { "$ref": "#/definitions/library/components/values/goal_radius" },
                                "search_count": { "$ref": "#/definitions/library/components/values/search_count" },
                                "search_height": { "$ref": "#/definitions/library/components/values/search_height", "description": "Height in blocks the mob will look for land to move towards" },
                                "search_range": { "$ref": "#/definitions/library/components/values/search_range", "description": "The distance in blocks it will look for land to move towards" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" }
                            }
                        },
                        "minecraft:behavior.move_to_random_block": {
                            "description": "Allows mob to move towards a random block.",
                            "type": "object",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "block_distance": { "$ref": "#/definitions/library/components/values/block_distance", "description": "Defines the distance from the mob, in blocks, that the block to move to will be chosen." },
                                "within_radius": { "$ref": "#/definitions/library/components/values/within_radius", "description": "Defines the distance in blocks the mob has to be from the block for the movement to be finished." }
                            }
                        },
                        "minecraft:behavior.move_to_village": {
                            "description": "Allows mob to move towards a random block.",
                            "type": "object",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "goal_radius": { "$ref": "#/definitions/library/components/values/goal_radius" },
                                "cooldown_time": { "$ref": "#/definitions/library/components/values/cooldown_time" },
                                "search_range": { "$ref": "#/definitions/library/components/values/search_range", "description": "The distance in blocks to search for villages. If <= 0, find the closest village regardless of distance." },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" }
                            }
                        },
                        "minecraft:behavior.move_to_water": {
                            "description": "Allows the mob to move into a random location within a village.",
                            "type": "object",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "goal_radius": { "$ref": "#/definitions/library/components/values/goal_radius" },
                                "search_count": { "$ref": "#/definitions/library/components/values/search_count" },
                                "search_height": { "$ref": "#/definitions/library/components/values/search_height", "description": "Height in blocks the mob will look for land to move towards" },
                                "search_range": { "$ref": "#/definitions/library/components/values/search_range", "description": "The distance in blocks it will look for land to move towards" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" }
                            }
                        },
                        "minecraft:behavior.move_towards_restriction": {
                            "description": "Allows the mob to move back into water when on land.",
                            "type": "object",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" }
                            }
                        },
                        "minecraft:behavior.move_towards_target": {
                            "description": "Allows Guardians, Iron Golems and Villagers to move within their pre-defined area that the mob should be restricted to. Other mobs don't have a restriction defined.",
                            "type": "object",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "within_radius": { "$ref": "#/definitions/library/components/values/within_radius", "description": "Defines the radius in blocks that the mob tries to be from the target. A value of 0 means it tries to occupy the same block as the target" }
                            }
                        },
                        "minecraft:behavior.nap": {
                            "description": "Allows mob to move towards its current target.",
                            "type": "object",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "coooldown_max": { "type": "number", "default": 0.0, "description": "Maximum time in seconds the mob has to wait before using the goal again" },
                                "cooldown_min": { "type": "number", "default": 0.0, "description": "Minimum time in seconds the mob has to wait before using the goal again" },
                                "mob_detect_dist": { "type": "number", "default": 6.0, "description": "The block distance in x and z that will be checked for mobs that this mob detects" },
                                "mob_detect_height": { "type": "number", "default": 6.0, "description": "The block distance in y that will be checked for mobs that this mob detects" }
                            }
                        },
                        "minecraft:behavior.nearest_attackable_target": {
                            "description": "Allows mobs to occassionally stop and take a nap under certain conditions.",
                            "type": "object",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "attack_interval": {
                                    "$ref": "#/definitions/library/components/values/attack_interval",
                                    "description": "Time range (in seconds) between searching for an attack target, range is in (0, \"attack_interval\"]. Only used if \"attack_interval\" is greater than 0, otherwise \"scan_interval\" is used."
                                },
                                "attack_interval_min": { "type": "integer", "default": 0.0, "description": "Alias for \"attack_interval\"; provides the same functionality as \"attack_interval\"." },
                                "attack_owner": { "type": "boolean", "default": false, "description": "If true, this entity can attack its owner." },
                                "entity_types": { "$ref": "#/definitions/library/components/values/entity_types", "description": "Filters which types of targets are valid for this entity." },
                                "must_reach": { "$ref": "#/definitions/library/components/values/must_reach", "description": "If true, this entity requires a path to the target." },
                                "must_see": { "$ref": "#/definitions/library/components/values/must_see", "description": "Determines if target-validity requires this entity to be in range only, or both in range and in sight." },
                                "must_see_forget_duration": {
                                    "$ref": "#/definitions/library/components/values/must_see_forget_duration",
                                    "description": "Time (in seconds) the target must not be seen by this entity to become invalid. Used only if \"must_see\" is true."
                                },
                                "persist_time": { "$ref": "#/definitions/library/components/values/persist_time", "description": "Time (in seconds) this entity can continue attacking the target after the target is no longer valid." },
                                "reselect_targets": {
                                    "$ref": "#/definitions/library/components/values/reselect_targets",
                                    "description": "Allows the attacking entity to update the nearest target, otherwise a target is only reselected after each \"scan_interval\" or \"attack_interval\"."
                                },
                                "scan_interval": {
                                    "$ref": "#/definitions/library/components/values/reselect_targets",
                                    "description": "If \"attack_interval\" is 0 or isn't declared, then between attacks: scanning for a new target occurs every amount of ticks equal to \"scan_interval\", minimum value is 10.."
                                },
                                "set_persistent": { "$ref": "#/definitions/library/components/values/set_persistent" },
                                "target_invisible_multiplier": { "type": "number", "default": 0.7, "description": "Multiplied with the target's armor coverage percentage to modify \"max_dist\" when detecting an invisible target." },
                                "target_search_height": {
                                    "$ref": "#/definitions/library/components/values/target_search_height",
                                    "description": "Maximum vertical target-search distance, if it's greater than the target type's \"max_dist\". A negative value defaults to \"entity_types\" greatest \"max_dist\"."
                                },
                                "target_sneak_visibility_multiplier": { "type": "number", "default": 0.8, "description": "Multiplied with the target type's \"max_dist\" when trying to detect a sneaking target." },
                                "within_radius": {
                                    "$ref": "#/definitions/library/components/values/within_radius",
                                    "description": "Maximum distance this entity can be from the target when following it, otherwise the target becomes invalid. This value is only used if the entity doesn't declare \"minecraft:follow_range\"."
                                }
                            }
                        },
                        "minecraft:behavior.nearest_prioritized_attackable_target": {
                            "description": "Allows an entity to attack the closest target within a given subset of specific target types.",
                            "type": "object",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "attack_interval": { "$ref": "#/definitions/library/components/values/attack_interval", "description": "Time in seconds between attacks" },
                                "entity_types": { "$ref": "#/definitions/library/components/values/entity_types", "description": "List of entity types that this mob considers valid targets" },
                                "must_reach": { "$ref": "#/definitions/library/components/values/must_reach", "description": "If true, only entities that this mob can path to can be selected as targets" },
                                "must_see": { "$ref": "#/definitions/library/components/values/must_see", "description": "If true, only entities in this mob's viewing range can be selected as targets" },
                                "must_see_forget_duration": {
                                    "$ref": "#/definitions/library/components/values/must_see_forget_duration",
                                    "description": "Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more"
                                },
                                "persist_time": { "$ref": "#/definitions/library/components/values/persist_time", "description": "Time (in seconds) this entity can continue attacking the target after the target is no longer valid." },
                                "reselect_targets": { "$ref": "#/definitions/library/components/values/reselect_targets", "description": "f true, the target will change to the current closest entity whenever a different entity is closer" },
                                "scan_interval": { "$ref": "#/definitions/library/components/values/scan_interval", "description": "How many ticks to wait between scanning for a target." },
                                "set_persistent": { "$ref": "#/definitions/library/components/values/set_persistent" },
                                "target_search_height": { "$ref": "#/definitions/library/components/values/target_search_height", "description": "Height in blocks to search for a target mob. -1.0 means the height does not matter." },
                                "within_radius": { "$ref": "#/definitions/library/components/values/within_radius", "description": "Distance in blocks that the target can be within to launch an attack" }
                            }
                        },
                        "minecraft:behavior.ocelot_sit_on_block": {
                            "description": "Allows the mob to check for and pursue the nearest valid target.",
                            "type": "object",
                            "properties": {
                                "priority": { "$ref": "#/definitions/library/components/values/priority" },
                                "speed_multiplier": { "$ref": "#/definitions/library/components/values/speed_multiplier" }
                            }
                        }, //release update announcement here; 69th component
                        "minecraft:behavior.ocelotattack": {
                            "type": "object"
                        },
                        "minecraft:behavior.offer_flower": {
                            "type": "object"
                        },
                        "minecraft:behavior.open_door": {
                            "type": "object"
                        },
                        "minecraft:behavior.owner_hurt_by_target": {
                            "type": "object"
                        },
                        "minecraft:behavior.owner_hurt_target": {
                            "type": "object"
                        },
                        "minecraft:behavior.panic": {
                            "type": "object"
                        },
                        "minecraft:behavior.peek": {
                            "type": "object"
                        },
                        "minecraft:behavior.pet_sleep_with_owner": {
                            "type": "object"
                        },
                        "minecraft:behavior.pickup_items": {
                            "type": "object"
                        },
                        "minecraft:behavior.play": {
                            "type": "object"
                        },
                        "minecraft:behavior.player_ride_tamed": {
                            "type": "object"
                        },
                        "minecraft:behavior.raid_garden": {
                            "type": "object"
                        },
                        "minecraft:behavior.random_breach": {
                            "type": "object"
                        },
                        "minecraft:behavior.random_fly": {
                            "type": "object"
                        },
                        "minecraft:behavior.random_hover": {
                            "type": "object"
                        },
                        "minecraft:behavior.random_look_around": {
                            "type": "object"
                        },
                        "minecraft:behavior.random_look_around_and_sit": {
                            "type": "object"
                        },
                        "minecraft:behavior.random_sitting": {
                            "type": "object"
                        },
                        "minecraft:behavior.random_stroll": {
                            "type": "object"
                        },
                        "minecraft:behavior.random_swim": {
                            "type": "object"
                        },
                        "minecraft:behavior.ranged_attack": {
                            "type": "object",
                            "description": "Allows an entity to attack by using ranged shots. \"charge_shoot_trigger\" must be greater than 0 to enable charged up burst-shot attacks.",
                            "properties": {
                                "attack_interval": {
                                    "type": "number",
                                    "default": 0,
                                    "description": "Alternative to \"attack_interval_min\" & \"attack_interval_max\". Consistent reload-time (in seconds), when not using a charged shot. Does not scale with target-distance."
                                },
                                "attack_interval_max": {
                                    "type": "number",
                                    "default": 0,
                                    "description": "Maximum bound for reload-time range (in seconds), when not using a charged shot. Reload-time range scales with target-distance."
                                },
                                "attack_interval_min": {
                                    "type": "number",
                                    "default": 0,
                                    "description": "Minimum bound for reload-time range (in seconds), when not using a charged shot. Reload-time range scales with target-distance."
                                },
                                "attack_radius": {"type": "number", "default": 0, "description": "Minimum distance to target before this entity will attempt to shoot."},
                                "burst_interval": {"type": "number", "default": 0, "description": "Time (in seconds) between each individual shot when firing a burst of shots from a charged up attack."},
                                "burst_shots": {"type": "integer", "default": 1, "description": "Number of shots fired every time the attacking entity uses a charged up attack."},
                                "charge_charged_trigger": {
                                    "type": "number",
                                    "default": 0,
                                    "description": "Time (in seconds, then add \"charge_shoot_trigger\"), before a charged up attack is done charging. Charge-time decays while target is not in sight."
                                },
                                "charge_shoot_trigger": {
                                    "type": "number",
                                    "default": 0,
                                    "description": "Amount of time (in seconds, then doubled) a charged shot must be charging before reloading burst shots. Charge-time decays while target is not in sight."
                                },
                                "ranged_fov": {"type": "number", "default": 90, "description": "Field of view (in degrees) when using sensing to detect a target for attack."},
                                "speed_multiplier": {"type": "number", "default": 1, "description": "During attack behavior, this multiplier modifies the entity's speed when moving toward the target."},
                                "target_in_sight_time": {"type": "number", "default": 1, "description": "Minimum amount of time (in seconds) the attacking entity needs to see the target before moving toward it."},
                                "x_max_rotation": {"type": "number", "default": 30, "description": "Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target."},
                                "y_max_head_rotation": {"type": "number", "default": 30, "description": "Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target."}
                            }
                        },
                        "minecraft:behavior.receive_love": {
                            "type": "object"
                        },
                        "minecraft:behavior.restrict_open_door": {
                            "type": "object"
                        },
                        "minecraft:behavior.restrict_sun": {
                            "type": "object"
                        },
                        "minecraft:behavior.roll": {
                            "type": "object"
                        },
                        "minecraft:behavior.run_around_like_crazy": {
                            "type": "object"
                        },
                        "minecraft:behavior.send_event": {
                            "type": "object"
                        },
                        "minecraft:behavior.share_items": {
                            "type": "object"
                        },
                        "minecraft:behavior.silverfish_merge_with_stone": {
                            "type": "object"
                        },
                        "minecraft:behavior.silverfish_wake_up_friends": {
                            "type": "object"
                        },
                        "minecraft:behavior.skeleton_horse_trap": {
                            "type": "object"
                        },
                        "minecraft:behavior.sleep": {
                            "type": "object"
                        },
                        "minecraft:behavior.slime_attack": {
                            "type": "object"
                        },
                        "minecraft:behavior.slime_float": {
                            "type": "object"
                        },
                        "minecraft:behavior.slime_keep_on_jumping": {
                            "type": "object"
                        },
                        "minecraft:behavior.slime_random_direction": {
                            "type": "object"
                        },
                        "minecraft:behavior.snacking": {
                            "type": "object"
                        },
                        "minecraft:behavior.sneeze": {
                            "type": "object"
                        },
                        "minecraft:behavior.squid_dive": {
                            "type": "object"
                        },
                        "minecraft:behavior.squid_flee": {
                            "type": "object"
                        },
                        "minecraft:behavior.squid_idle": {
                            "type": "object"
                        },
                        "minecraft:behavior.squid_move_away_from_ground": {
                            "type": "object"
                        },
                        "minecraft:behavior.squid_out_of_water": {
                            "type": "object"
                        },
                        "minecraft:behavior.stalk_and_pounce_on_target": {
                            "type": "object"
                        },
                        "minecraft:behavior.stay_while_sitting": {
                            "type": "object"
                        },
                        "minecraft:behavior.stomp_attack": {
                            "type": "object"
                        },
                        "minecraft:behavior.stomp_turtle_egg": {
                            "type": "object"
                        },
                        "minecraft:behavior.stroll_towards_village": {
                            "type": "object"
                        },
                        "minecraft:behavior.summon_entity": {
                            "type": "object"
                        },
                        "minecraft:behavior.swell": {
                            "type": "object"
                        },
                        "minecraft:behavior.swim_idle": {
                            "type": "object"
                        },
                        "minecraft:behavior.swim_wander": {
                            "type": "object"
                        },
                        "minecraft:behavior.swim_with_entity": {
                            "type": "object"
                        },
                        "minecraft:behavior.swoop_attack": {
                            "type": "object"
                        },
                        "minecraft:behavior.target_when_pushed": {
                            "type": "object"
                        },
                        "minecraft:behavior.take_flower": {
                            "type": "object"
                        },
                        "minecraft:behavior.tempt": {
                            "type": "object"
                        },
                        "minecraft:behavior.trade_interest": {
                            "type": "object"
                        },
                        "minecraft:behavior.trade_with_player": {
                            "type": "object"
                        },
                        "minecraft:behavior.vex_copy_owner_target": {
                            "type": "object"
                        },
                        "minecraft:behavior.vex_random_move": {
                            "type": "object"
                        },
                        "minecraft:behavior.wither_random_attack_pos_goal": {
                            "type": "object"
                        },
                        "minecraft:behavior.wither_target_highest_damage": {
                            "type": "object"
                        },
                        "minecraft:addrider": {
                            "type": "object"
                        },
                        "minecraft:admire_item": {
                            "type": "object"
                        },
                        "minecraft:ageable": {
                            "type": "object"
                        },
                        "minecraft:ambient_sound_interval": {
                            "type": "object"
                        },
                        "minecraft:angry": {
                            "type": "object"
                        },
                        "minecraft:area_attack": {
                            "type": "object"
                        },
                        "minecraft:attack": {
                            "type": "object",
                            "description": "Defines an entity's melee attack and any additional effects on it.",
                            "properties": {
                                "damage": { "type": ["number", "array"], "description": "Range of the random amount of damage the melee attack deals. A negative value can heal the entity instead of hurting it" },
                                "effect_name": { "type": "string", "$ref": "#/definitions/library/effects", "description": "Identifier of the status ailment to apply to an entity attacked by this entity's melee attack" },
                                "effect_duration": { "type": "number", "default": 0.0, "description": "Duration in seconds of the status ailment applied to the damaged entity" }
                            }
                        },
                        "minecraft:attack_cooldown": {
                            "type": "object"
                        },
                        "minecraft:attack_damage": {
                            "type": "object"
                        },
                        "minecraft:balloonable": {
                            "type": "object"
                        },
                        "minecraft:barter": {
                            "type": "object"
                        },
                        "minecraft:block_sensor": {
                            "type": "object"
                        },
                        "minecraft:boostable": {
                            "type": "object"
                        },
                        "minecraft:boss": {
                            "type": "object",
                            "description": "The current state of the boss for updating the boss HUD.",
                            "properties": {
                                "should_darken_sky": { "type": "boolean", "default": false, "description": "Whether the sky should darken in the presence of the boss." },
                                "name": { "type": "string", "description": "The name that will be displayed above the boss's health bar." },
                                "hud_range": { "type": "integer", "default": 55, "description": "The max distance from the boss at which the boss's health bar is present on the players screen."
                                }
                            }
                        },
                        "minecraft:break_blocks": {
                            "type": "object"
                        },
                        "minecraft:breathable": {
                            "type": "object"
                        },
                        "minecraft:breedable": {
                            "type": "object"
                        },
                        "minecraft:bribeable": {
                            "type": "object"
                        },
                        "minecraft:burns_in_daylight": {
                            "type": "object"
                        },
                        "minecraft:can_climb": {
                            "type": "object"
                        },
                        "minecraft:can_fly": {
                            "type": "object"
                        },
                        "minecraft:can_power_jump": {
                            "type": "object"
                        },
                        "minecraft:celebrate_hunt": {
                            "type": "object"
                        },
                        "minecraft:collision_box": {
                            "type": "object",
                            "description": "Sets the width and height of the Entity's collision box.",
                            "properties": {
                                "width": {
                                    "type": "number",
                                    "default": 1.0,
                                    "description": "Width and Depth of the collision box in blocks. A negative value will be assumed to be 0"
                                },
                                "height": {
                                    "type": "number",
                                    "default": 1.0,
                                    "description": "Height of the collision box in blocks. A negative value will be assumed to be 0"
                                }
                            }
                        },
                        "minecraft:color": {
                            "type": "object",
                            "description": "Defines the entity's color. Only works on vanilla entities that have predefined color values (sheep, llama, shulker).",
                            "properties": {
                                "value": { "$ref": "#/definitions/library/components/values/value", "description": "The second Palette Color value of the entity", "default": 0 }
                            }
                        },
                        "minecraft:color2": {
                            "type": "object",
                            "description": "Defines the entity's second texture color. Only works on vanilla entities that have a second predefined color values (tropical fish).",
                            "properties": {
                                "value": { "$ref": "#/definitions/library/components/values/value", "description": "The Palette Color value of the entity", "default": 0 }
                            }
                        },
                        "minecraft:custom_hit_test": {
                            "type": "object"
                        },
                        "minecraft:damage_over_time": {
                            "type": "object"
                        },
                        "minecraft:damage_sensor": {
                            "type": "object",
                            "description": "Defines what events to call when this entity is damaged by specific entities or items.",
                            "properties": {
                                "triggers": {
                                    "type": ["array", "object"],
                                    "properties": {
                                        "cause": { "type": "string", "$ref": "#/definitions/library/filters/domains/has_damage", "default": "none", "description": "Type of damage that triggers the events." },
                                        "damage_multiplier": {
                                            "type": "number",
                                            "default": 1.0,
                                            "description": "A multiplier that modifies the base damage from the damage cause. If deals_damage is true the multiplier can only reduce the damage the entity will take to a minimum of 1."
                                        },
                                        "deals_damage": { "type": "boolean", "default": true, "description": "If true, the damage dealt to the entity will take away health from it, set to false to make the entity ignore that damage." },
                                        "on_damage": { "$ref": "#/definitions/library/components/values/trigger", "filters": "Specifies filters for entity definitions and events." },
                                        "on_damage_sound_event": { "type": "string", "description": "Defines what sound to play, if any, when the on_damage filters are met." }
                                    },
                                    "items": [
                                        {
                                            "properties": {
                                                "cause": { "type": "string", "$ref": "#/definitions/library/filters/domains/has_damage", "default": "none", "description": "Type of damage that triggers the events." },
                                                "damage_multiplier": {
                                                    "type": "number",
                                                    "default": 1.0,
                                                    "description": "A multiplier that modifies the base damage from the damage cause. If deals_damage is true the multiplier can only reduce the damage the entity will take to a minimum of 1."
                                                },
                                                "deals_damage": { "type": "boolean", "default": true, "description": "If true, the damage dealt to the entity will take away health from it, set to false to make the entity ignore that damage." },
                                                "on_damage": { "$ref": "#/definitions/library/components/values/trigger", "filters": "Specifies filters for entity definitions and events." },
                                                "on_damage_sound_event": { "type": "string", "description": "Defines what sound to play, if any, when the on_damage filters are met." }
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        "minecraft:default_look_angle": {
                            "type": "object",
                            "description": "Sets this entity's default head rotation angle.",
                            "properties": {
                                "value": { "$ref": "#/definitions/library/components/values/value_decimal", "default": 0.0, "description": "Angle in degrees" }
                            }
                        },
                        "minecraft:despawn": {
                            "type": "object",
                            "description": "Despawns the Actor when the despawn rules or optional filters evaluate to true.",
                            "properties": {
                                "despawn_from_distance": {
                                    "type": "object",
                                    "properties": {
                                        "min_distance": { "type": "number", "description": "Maximum distance for standard despawn rules to instantly despawn the mob.", "default": 32 },
                                        "max_distance": { "type": "number", "description": "Minimum distance for standard despawn rules to try to despawn the mob.", "default": 128 }
                                    }
                                },
                                "filters": { "description": "The list of conditions that must be satisfied before the Actor is despawned. If a filter is defined then standard despawn rules are ignored.", "$ref": "#/definitions/filters" },
                                "despawn_from_chance": { "type": "boolean", "default": true, "description": "Determines if \"min_range_random_chance\" is used in the standard despawn rules" },
                                "despawn_from_inactivity": { "type": "boolean", "default": true, "description": "Determines if the \"min_range_inactivity_timer\" is used in the standard despawn rules." },
                                "despawn_from_simulation_edge": { "type": "boolean", "default": true, "description": "Determines if the mob is instantly despawned at the edge of simulation distance in the standard despawn rules." },
                                "min_range_inactivity_timer": { "type": "number", "default": 30, "description": "The amount of time in seconds that the mob must be inactive." },
                                "min_range_random_chance": { "type": "number", "default": 800, "description": "A random chance between 1 and the given value." },
                                "remove_child_entities": { "$ref": "#/definitions/library/components/values/remove_child_entities", "default": false }
                            }
                        },
                        "minecraft:dweller": {
                            "type": "object"
                        },
                        "minecraft:economy_trade_table": {
                            "type": "object"
                        },
                        "minecraft:environment_sensor": {
                            "description": "The list of triggers that fire when the environment conditions match the given filter criteria.",
                            "type": "object",
                            "properties": {
                                "triggers": {
                                    "type": ["array", "object"],
                                    "items": [ { "$ref": "#/definitions/library/components/values/trigger" } ],
                                    "$ref": "#/definitions/library/components/values/trigger"
                                }
                            }
                        },
                        "minecraft:entity_sensor": {
                            "type": "object",
                            "description": "A component that fires an event when a set of conditions are met by other entities within the defined range.",
                            "properties": {
                                "sensor_range": { "type": "number", "default": 10, "description": "The maximum distance another entity can be from this and have the filters checked against it." },
                                "relative_range": { "type": "boolean", "default": true, "description": "If true the sensor range is additive on top of the entity's size." },
                                "require_all": { "type": "boolean", "default": false, "description": "If true requires all nearby entities to pass the filter conditions for the event to send." },
                                "minimum_count": { "type": "integer", "default": 1, "description": "The minimum number of entities that must pass the filter conditions for the event to send." },
                                "maximum_count": { "type": "integer", "default": -1, "description": "The maximum number of entities that must pass the filter conditions for the event to send." },
                                "event_filters": { "$ref": "#/definitions/filters" },
                                "event": { "type": "string" }
                            }
                        },
                        "minecraft:equipment": {
                            "type": "object"
                        },
                        "minecraft:equippable": {
                            "type": "object"
                        },
                        "minecraft:experience_reward": {
                            "type": "object"
                        },
                        "minecraft:explode": {
                            "type": "object"
                        },
                        "minecraft:fire_immune": {
                            "type": "boolean"
                        },
                        "minecraft:floats_in_liquid": {
                            "type": "object"
                        },
                        "minecraft:flocking": {
                            "type": "object"
                        },
                        "minecraft:flying_speed": {
                            "type": "object",
                            "description": "Speed in Blocks that this entity flies at.",
                            "properties": {
                                "value": { "$ref": "#/definitions/library/components/values/value_decimal", "default": 0.002, "description": "Flying speed in blocks per tick" }
                            }
                        },
                        "minecraft:follow_range": {
                            "type": "object",
                            "properties": {
                                "value": { "$ref": "#/definitions/library/components/values/value_decimal" }
                            }
                        },
                        "minecraft:foot_size": {
                            "type": "object",
                            "description": "Sets the number of blocks the entity can step without jumping.",
                            "properties": {
                                "value": { "$ref": "#/definitions/library/components/values/value_decimal", "default": 0.5, "description": "The value of the size of the entity's step" }
                            }
                        },
                        "minecraft:friction_modifier": {
                            "type": "object",
                            "description": "Defines how much does friction affect this entity.",
                            "properties": {
                                "value": {"$ref": "#/definitions/library/components/values/value_decimal", "default": 1.0, "description": "The higher the number, the more the friction affects this entity. A value of 1.0 means regular friction, while 2.0 means twice as much" }
                            }
                        },
                        "minecraft:genetics": {
                            "type": "object"
                        },
                        "minecraft:giveable": {
                            "type": "object"
                        },
                        "minecraft:ground_offset": {
                            "type": "object",
                            "description": "Sets the offset from the ground that the entity is actually at.",
                            "properties": {
                                "value": { "$ref": "#/definitions/library/components/values/value_decimal", "default": 0.0, "description": "The value of the entity's offset from the terrain, in blocks" }
                            }
                        },
                        "minecraft:group_size": {
                            "type": "object"
                        },
                        "minecraft:grows_crop": {
                            "type": "object"
                        },
                        "minecraft:healable": {
                            "type": "object",
                            "description": "Defines the interactions with this entity for healing it.",
                            "properties": {
                                "filters": { "$ref": "#/definitions/filters" },
                                "force_use": {
                                    "type": "boolean",
                                    "default": false,
                                    "description": "Determines if item can be used regardless of entity being at full health."
                                },
                                "items": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "heal_amount": { "type": "integer", "default": 1, "description": "The amount of health this entity gains when fed this item." },
                                            "item": { "type": "string", "description": "Item identifier that can be used to heal this entity." }
                                        }
                                    }
                                }
                            }
                        },
                        "minecraft:health": {
                            "type": "object",
                            "$ref": "#/definitions/library/components/values/value_with_max"
                        },
                        "minecraft:hide": {
                            "type": "object"
                        },
                        "minecraft:home": {
                            "type": "object"
                        },
                        "minecraft:horse.jump_strength": {
                            "type": "object"
                        },
                        "minecraft:hurt_on_condition": {
                            "type": "object"
                        },
                        "minecraft:input_ground_controlled": {
                            "type": "object"
                        },
                        "minecraft:insomnia": {
                            "type": "object"
                        },
                        "minecraft:interact": {
                            "type": "object",
                            "description": "Defines interactions with this entity.",
                            "anyOf": [
                                {
                                    "properties": {
                                        "add_items": { "type": "object", "properties": { "table": { "$ref": "#/definitions/library/components/values/loot_table" } }, "description": "Loot table with items to add to the player's inventory upon successful interaction." },
                                        "cooldown": { "$ref": "#/definitions/library/components/values/cooldown", "description": "Time in seconds before this entity can be interacted with again." },
                                        "hurt_item": { "type": "integer", "default": 0, "description": "The amount of damage the item will take when used to interact with this entity. A value of 0 means the item won't lose durability." },
                                        "interact_text": { "type": "string", "description": "Text to show when the player is able to interact in this way with this entity when playing with Touch-screen controls." },
                                        "on_interact": { "$ref": "#/definitions/library/components/values/trigger", "description": "Event to fire when the interaction occurs." },
                                        "particle_on_start": {
                                            "type": "object",
                                            "description": "Particle effect that will be triggered at the start of the interaction.",
                                            "properties": {
                                                "particle_offset_towards_interactor": { "description": "Whether or not the particle will appear closer to who performed the interaction." },
                                                "particle_type": { "description": "The type of particle that will be spawned." },
                                                "particle_y_offset": { "description": "Will offset the particle this amount in the y direction." }
                                            }
                                        },
                                        "play_sounds": { "type": "string", "description": "List of sounds to play when the interaction occurs." },
                                        "spawn_entities": { "type": "string", "$ref": "#/definitions/library/entities", "description": "List of entities to spawn when the interaction occurs." },
                                        "spawn_items": { "type": "object", "properties": { "table": { "$ref": "#/definitions/library/components/values/loot_table" } }, "description": "Loot table with items to drop on the ground upon successful interaction." },
                                        "swing": { "type": "boolean", "default": false, "description": "If true, the player will do the 'swing' animation when interacting with this entity." },
                                        "transform_to_item": {
                                            "type": "string",
                                            "description": "The item used will transform to this item upon successful interaction. Format: itemName:auxValue",
                                            "allOf": [ { "$ref": "#/definitions/library/items" }, { "$ref": "#/definitions/library/blocks" } ]
                                        },
                                        "use_item": { "type": "boolean", "default": false, "description": "If true, the interaction will use an item." }
                                    },
                                    "additionalProperties": false
                                },
                                {
                                    "properties": {
                                        "interactions": {
                                            "type": "array",
                                            "items": [
                                                {
                                                    "type": "object",
                                                    "properties": {
                                                        "add_items": { "type": "object", "properties": { "table": { "$ref": "#/definitions/library/components/values/loot_table" } }, "description": "Loot table with items to add to the player's inventory upon successful interaction." },
                                                        "cooldown": { "$ref": "#/definitions/library/components/values/cooldown", "description": "Time in seconds before this entity can be interacted with again." },
                                                        "hurt_item": { "type": "integer", "default": 0, "description": "The amount of damage the item will take when used to interact with this entity. A value of 0 means the item won't lose durability." },
                                                        "interact_text": { "type": "string", "description": "Text to show when the player is able to interact in this way with this entity when playing with Touch-screen controls." },
                                                        "on_interact": { "$ref": "#/definitions/library/components/values/trigger", "description": "Event to fire when the interaction occurs." },
                                                        "particle_on_start": {
                                                            "type": "object",
                                                            "description": "Particle effect that will be triggered at the start of the interaction.",
                                                            "properties": {
                                                                "particle_offset_towards_interactor": { "description": "Whether or not the particle will appear closer to who performed the interaction." },
                                                                "particle_type": { "description": "The type of particle that will be spawned." },
                                                                "particle_y_offset": { "description": "Will offset the particle this amount in the y direction." }
                                                            }
                                                        },
                                                        "play_sounds": { "type": "string", "description": "List of sounds to play when the interaction occurs." },
                                                        "spawn_entities": { "type": "string", "$ref": "#/definitions/library/entities", "description": "List of entities to spawn when the interaction occurs." },
                                                        "spawn_items": { "type": "object", "properties": { "table": { "$ref": "#/definitions/library/components/values/loot_table" } }, "description": "Loot table with items to drop on the ground upon successful interaction." },
                                                        "swing": { "type": "boolean", "default": false, "description": "If true, the player will do the 'swing' animation when interacting with this entity." },
                                                        "transform_to_item": {
                                                            "type": "string",
                                                            "description": "The item used will transform to this item upon successful interaction. Format: itemName:auxValue",
                                                            "allOf": [ { "$ref": "#/definitions/library/items" }, { "$ref": "#/definitions/library/blocks" } ]
                                                        },
                                                        "use_item": { "type": "boolean", "default": false, "description": "If true, the interaction will use an item." }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        },
                        "minecraft:inventory": {
                            "type": "object"
                        },
                        "minecraft:is_baby": {
                            "type": "object"
                        },
                        "minecraft:is_charged": {
                            "type": "object"
                        },
                        "minecraft:is_chested": {
                            "type": "object"
                        },
                        "minecraft:is_dyeable": {
                            "type": "object"
                        },
                        "minecraft:is_hidden_when_invisible": {
                            "type": "object"
                        },
                        "minecraft:is_ignited": {
                            "type": "object"
                        },
                        "minecraft:is_illager_captain": {
                            "type": "object"
                        },
                        "minecraft:is_saddled": {
                            "type": "object"
                        },
                        "minecraft:is_shaking": {
                            "type": "object"
                        },
                        "minecraft:is_sheared": {
                            "type": "object"
                        },
                        "minecraft:is_stackable": {
                            "type": "object"
                        },
                        "minecraft:is_stunned": {
                            "type": "object"
                        },
                        "minecraft:is_tamed": {
                            "type": "object"
                        },
                        "minecraft:item_controllable": {
                            "type": "object"
                        },
                        "minecraft:item_hopper": {
                            "type": "object"
                        },
                        "minecraft:jump.dynamic": {
                            "type": "object"
                        },
                        "minecraft:jump.static": {
                            "type": "object"
                        },
                        "minecraft:knockback_resistance": {
                            "type": "object",
                            "$ref": "#/definitions/library/components/values/value_with_max"
                        },
                        "minecraft:lava_movement": {
                            "type": "object"
                        },
                        "minecraft:leashable": {
                            "type": "object"
                        },
                        "minecraft:lookat": {
                            "type": "object"
                        },
                        "minecraft:loot": {
                            "type": "object"
                        },
                        "minecraft:managed_wandering_trader": {
                            "type": "object"
                        },
                        "minecraft:mark_variant": {
                            "type": "object",
                            "description": "Additional variant value. Can be used to further differentiate variants.",
                            "properties": {
                                "value": { "$ref": "#/definitions/library/components/values/value", "description": "The ID of the variant. By convention, 0 is the ID of the base entity", "default": 0 }
                            }
                        },
                        "minecraft:mob_effect": {
                            "type": "object"
                        },
                        "minecraft:movement": {
                            "type": "object",
                            "properties": {
                                "value": { "$ref": "#/definitions/library/components/values/value_decimal" }
                            }
                        },
                        "minecraft:movement.amphibious": {
                            "type": "object"
                        },
                        "minecraft:movement.basic": {
                            "type": "object"
                        },
                        "minecraft:movement.fly": {
                            "type": "object"
                        },
                        "minecraft:movement.generic": {
                            "type": "object"
                        },
                        "minecraft:movement.hover": {
                            "type": "object"
                        },
                        "minecraft:movement.jump": {
                            "type": "object"
                        },
                        "minecraft:movement.glide": {
                            "type": "object"
                        },
                        "minecraft:skin_id": {
                            "type": "object",
                            "description": "Skin ID value. Can be used to differentiate skins, such as base skins for villagers.",
                            "properties": {
                                "value": { "$ref": "#/definitions/library/components/values/value", "default": 0, "description": "The ID of the skin. By convention, 0 is the ID of the base skin" }
                            }
                        },
                        "minecraft:movement.skip": {
                            "type": "object"
                        },
                        "minecraft:movement.sway": {
                            "type": "object"
                        },
                        "minecraft:nameable": {
                            "type": "object"
                        },
                        "minecraft:navigation.climb": {
                            "type": "object"
                        },
                        "minecraft:navigation.float": {
                            "type": "object"
                        },
                        "minecraft:navigation.fly": {
                            "type": "object"
                        },
                        "minecraft:navigation.generic": {
                            "type": "object"
                        },
                        "minecraft:navigation.hover": {
                            "type": "object"
                        },
                        "minecraft:navigation.swim": {
                            "type": "object"
                        },
                        "minecraft:navigation.walk": {
                            "type": "object"
                        },
                        "minecraft:npc": {
                            "type": "object"
                        },
                        "minecraft:on_death": {
                            "type": "object"
                        },
                        "minecraft:on_friendly_anger": {
                            "type": "object"
                        },
                        "minecraft:on_hurt": {
                            "type": "object"
                        },
                        "minecraft:on_hurt_by_player": {
                            "type": "object"
                        },
                        "minecraft:on_ignite": {
                            "type": "object"
                        },
                        "minecraft:on_start_landing": {
                            "type": "object"
                        },
                        "minecraft:on_start_takeoff": {
                            "type": "object"
                        },
                        "minecraft:on_target_acquired": {
                            "type": "object",
                            "description": "Adds a trigger to call when this entity finds a target.",
                            "$ref": "#/definitions/library/components/values/trigger"
                        },
                        "minecraft:on_target_escape": {
                            "type": "object",
                            "description": "Adds a trigger to call when this entity loses the target it currently has.",
                            "$ref": "#/definitions/library/components/values/trigger"
                        },
                        "minecraft:on_wake_with_owner": {
                            "type": "object"
                        },
                        "minecraft:peek": {
                            "type": "object"
                        },
                        "minecraft:persistent": {
                            "type": "object"
                        },
                        "minecraft:physics": {
                            "type": "object"
                        },
                        "minecraft:player.saturation": {
                            "properties": {
                                "value": { "$ref": "#/definitions/library/components/values/value_decimal" }
                            }
                        },
                        "minecraft:player.exhaustion": {
                            "$ref": "#/definitions/library/components/values/value_with_max"
                        },
                        "minecraft:player.level": {
                            "$ref": "#/definitions/library/components/values/value_with_max"
                        },
                        "minecraft:player.experience": {
                            "$ref": "#/definitions/library/components/values/value_with_max"
                        },
                        "minecraft:pushable": {
                            "type": "object",
                            "description": "Defines what can push an entity between other entities and pistons.",
                            "properties": {
                                "is_pushable": {
                                    "type": "boolean",
                                    "default": true,
                                    "description": "Whether the entity can be pushed by other entities."
                                },
                                "is_pushable_by_piston": {
                                    "type": "boolean",
                                    "default": true,
                                    "description": "Whether the entity can be pushed by pistons safely."
                                }
                            }
                        },
                        "minecraft:push_through": {
                            "type": "object",
                            "description": "Sets the distance through which the entity can push through.",
                            "properties": {
                                "value": { "$ref": "#/definitions/library/components/values/value_decimal", "default": 0.002, "description": "The value of the entity's push-through, in blocks" }
                            }
                        },
                        "minecraft:preferred_path": {
                            "type": "object"
                        },
                        "minecraft:projectile": {
                            "type": "object"
                        },
                        "minecraft:raid_trigger": {
                            "type": "object"
                        },
                        "minecraft:rail_movement": {
                            "type": "object"
                        },
                        "minecraft:rail_sensor": {
                            "type": "object"
                        },
                        "minecraft:ravager_blocked": {
                            "type": "object"
                        },
                        "minecraft:rideable": {
                            "type": "object"
                        },
                        "minecraft:scaffolding_climber": {
                            "type": "object"
                        },
                        "minecraft:scale": {
                            "type": "object",
                            "description": "Sets the entity's visual size.",
                            "properties": {
                                "value": {
                                    "$ref": "#/definitions/library/components/values/value_decimal",
                                    "description": "The value of the scale. 1.0 means the entity will appear at the scale they are defined in their model. Higher numbers make the entity bigger",
                                    "default": 1.0
                                }
                            }
                        },
                        "minecraft:scale_by_age": {
                            "type": "object"
                        },
                        "minecraft:scheduler": {
                            "type": "object"
                        },
                        "minecraft:shareables": {
                            "type": "object"
                        },
                        "minecraft:shooter": {
                            "type": "object"
                        },
                        "minecraft:sittable": {
                            "type": "object"
                        },
                        "minecraft:sound_volume": {
                            "type": "object",
                            "description": "Sets the entity's base volume for sound effects.",
                            "properties": {
                                "value": { "$ref": "#/definitions/library/components/values/value_decimal", "default": 1.0, "description": "The value of the volume the entity uses for sound effects" }
                            }
                        },
                        "minecraft:spawn_entity": {
                            "type": "object",
                            "description": "Adds a timer after which this entity will spawn another entity or item (similar to vanilla's chicken's egg-laying behavior).`",
                            "properties": {
                                "entities": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/library/components/values/spawn_entity"
                                    }
                                }
                            }
                        },
                        "minecraft:spell_effects": {
                            "type": "object"
                        },
                        "minecraft:strength": {
                            "type": "object",
                            "description": "Defines the entity's strength to carry items.",
                            "properties": {
                                "value": { "$ref": "#/definitions/library/components/values/value", "description": "The initial value of the strength", "default": 1 },
                                "max": { "type": "integer", "description": "The maximum strength of this entity", "default": 5 }
                            }
                        },
                        "minecraft:tameable": {
                            "type": "object"
                        },
                        "minecraft:tamemount": {
                            "type": "object"
                        },
                        "minecraft:target_nearby_sensor": {
                            "type": "object"
                        },
                        "minecraft:teleport": {
                            "type": "object"
                        },
                        "minecraft:tick_world": {
                            "type": "object"
                        },
                        "minecraft:timer": {
                            "type": "object",
                            "description": "Adds a timer after which an event will fire.",
                            "properties": {
                                "looping": { "type": "boolean", "default": true, "description": "If true, the timer will restart every time after it fires." },
                                "time": { "type": ["array", "number"], "default": 0, "description": "Amount of time in seconds for the timer. Can be specified as a number or a pair of numbers (min and max). Incompatible with random_time_choices.", "items": { "type": "number" } },
                                "randomInterval": { "type": "boolean", "default": true, "description": "If true, the amount of time on the timer will be random between the min and max values specified in time." },
                                "time_down_event": { "description": "Event to fire when the time on the timer runs out.", "$ref": "#/definitions/library/components/values/trigger" },
                                "random_time_choices": {
                                    "type": "array",
                                    "default": [],
                                    "description": "This is a list of objects, representing one value in seconds that can be picked before firing the event and an optional weight. Incompatible with time.",
                                    "items": { "type": "object", "properties": { "weight": { "type": "number" }, "value": { "type": "number" } } }
                                }
                            }
                        },
                        "minecraft:trade_resupply": {
                            "type": "object"
                        },
                        "minecraft:trade_table": {
                            "type": "object"
                        },
                        "minecraft:trail": {
                            "type": "object"
                        },
                        "minecraft:transformation": {
                            "type": "object"
                        },
                        "minecraft:trusting": {
                            "type": "object"
                        },
                        "minecraft:trust": {
                            "type": "object"
                        },
                        "minecraft:type_family": {
                            "type": "object",
                            "description": "Defines the families this entity belongs to.",
                            "properties": {
                                "family": { "type": ["array", "string"], "description": "List of family names", "items": { "type": "string" } }
                            }
                        },
                        "minecraft:underwater_movement": { "type": "object" },
                        "minecraft:variant": {
                            "type": "object",
                            "description": "Used to differentiate the component group of a variant of an entity from others (e.g. ocelot, villager)",
                            "properties": {
                                "value": { "$ref": "#/definitions/library/components/values/value_decimal", "description": "The ID of the variant. By convention, 0 is the ID of the base entity" }
                            }
                        },
                        "minecraft:walk_animation_speed": {
                            "type": "object",
                            "description": "Sets the speed multiplier for this entity's walk animation speed.",
                            "properties": {
                                "value": { "$ref": "#/definitions/library/components/values/value_decimal", "default": 1.0, "description": "The higher the number, the faster the animation for walking plays. A value of 1.0 means normal speed, while 2.0 means twice as fast" }
                            }
                        },
                        "minecraft:wants_jockey": {
                            "type": "object"
                        },
                        "minecraft:water_movement": {
                            "type": "object"
                        }
                    },
                    "values": {
                        "priority": { "type": "integer", "default": 0, "description": "Determines which behavior the entity will prioritize when two of the same type run. 0 is the highest priority." },
                        "poi_type": { "type": "string", "examples": [ "bed" ], "description": "Defines what POI type to hide at." },
                        "duration": { "type": "number", "default": 1.0, "description": "Amount of time in seconds that the mob reacts." },
                        "speed_multiplier": { "type": "number", "default": 1.0, "description": "Movement speed multiplier of the mob when using this AI Goal" },
                        "timeout_cooldown": { "type": "number", "default": "8.0", "description": "Movement speed multiplier of the mob when using this AI Goal" },
                        "items": { "items": [ { "type": "string", "$ref": "#/definitions/library/items" }, { "type": "string", "$ref": "#/definitions/library/blocks" } ] },
                        "look_distance":{ "type": "number", "default": 8.0, "description": "The distance in blocks from which the entity will look at" },
                        "look_time": { "type": "array", "default": [ 2, 4 ], "description": "Time range to look at the entity" },
                        "attack_once": { "type": "boolean", "default": false, "description": "Allows the entity to use this attack behavior, only once EVER." },
                        "attack_types": { "type": "String", "description": "Defines the entity types this entity will attack." },
                        "goal_radius": { "type": "number", "default": 0.5, "description": "Distance in blocks within the mob considers it has reached the goal. This is the \"wiggle room\" to stop the AI from bouncing back and forth trying to reach a specific spot" },
                        "inner_boundary_time_increase": { "type": "number", "default": 0.25, "description": "Time (in seconds) to add to attack path recalculation when the target is beyond the \"path_inner_boundary\"." },
                        "max_path_time": { "type": "number", "default": 0.55, "description": "Maximum base time (in seconds) to recalculate new attack path to target (before increases applied)." },
                        "melee_fov": { "type": "number", "default": 90.0, "description": "Field of view (in degrees) when using the sensing component to detect an attack target." },
                        "min_path_time": { "type": "number", "default": 0.2, "description": "Minimum base time (in seconds) to recalculate new attack path to target (before increases applied)." },
                        "on_attack": { "$ref": "#/definitions/library/components/values/trigger", "description": "Defines the event to trigger when this entity successfully attacks." },
                        "outer_boundary_time_increase": { "type": "number", "default": 0.5, "description": "Time (in seconds) to add to attack path recalculation when the target is beyond the \"path_outer_boundary\"." },
                        "path_fail_time_increase": { "type": "number", "default": 0.75, "description": "Time (in seconds) to add to attack path recalculation when this entity cannot move along the current path." },
                        "path_inner_boundary": { "type": "number", "default": 16.0, "description": "Distance at which to increase attack path recalculation by \"inner_boundary_tick_increase\"." },
                        "path_outer_boundary": { "type": "number", "default": 32.0, "description": "Distance at which to increase attack path recalculation by \"outer_boundary_tick_increase\"." },
                        "random_stop_interval": { "type": "integer", "default": 0, "description": "This entity will have a 1 in N chance to stop it's current attack, where N = \"random_stop_interval\"." },
                        "reach_multiplier": { "type": "number", "default": 0.55, "description": "Used with the base size of the entity to determine minimum target-distance before trying to deal attack damage." },
                        "require_complete_path": { "type": "boolean", "default": 0.55, "description": "Toggles (on/off) the need to have a full path from the entity to the target when using this melee attack behavior." },
                        "track_target": { "type": "boolean", "default": false, "description": "If true, this mob will chase after the target as long as it's a valid target" },
                        "must_reach": { "type": "boolean", "default": false },
                        "set_persistent": { "type": "boolean", "default": false, "description": "Allows the actor to be set to persist upon targeting a player" },
                        "x_max_rotation": { "type": "number", "default": 30.0, "description": "Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target." },
                        "y_max_head_rotation": { "type": "number", "default": 30.0, "description": "Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target." },
                        "target_dist": { "type": "number", "default": 0.0, "description": "The distance at which this mob wants to be away from its target" },
                        "loot_table": { "type": "string", "pattern": "^.*\\.json$", "description": "File path, relative to the Behavior Pack's path, to the loot table file." },
                        "block_distance": { "type": "number", "default": 16.0 },
                        "max_dist": { "type": "number", "default": 0.0 },
                        "value": { "type": "integer" },
                        "value_decimal": { "type": "number" },
                        "value_with_max": {
                            "type": "object",
                            "properties": {
                                "value": { "$ref": "#/definitions/library/components/values/value" },
                                "max": { "type": "integer" }
                            }
                        },
                        "search_height": { "type": "integer", "default": 1 },
                        "search_range": { "type": "integer", "default": 0 },
                        "search_count": { "type": "integer", "default": 10, "description": "The number of blocks each tick that the mob will check within it's search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick" },
                        "xz_dist": { "type": "integer", "default": 10, "minimum": 1, "description": "Distance in blocks on ground that the mob will look for a new spot to move to. Must be at least 1" },
                        "y_dist": { "type": "integer", "default": 7, "minimum": 1, "description": "Distance in blocks that the mob will look up or down for a new spot to move to. Must be at least 1" },
                        "stop_distance": { "type": "number", "default": 2.0 },
                        "cooldown_time": { "type": "number", "default": 0.0, "description": "Time in seconds the mob has to wait before using the goal again" },
                        "cooldown": { "type": "number", "default": 0.0 },
                        "within_radius": { "type": "number", "default": 0.0 },
                        "y_offset": { "type": "number", "default": 0.0, "description": "Height in blocks to add to the selected target position" },
                        "avoid_water": { "type": "boolean", "default": false, "description": "Tells the pathfinder to avoid water when creating a path" },
                        "broadcast": { "type": "boolean", "default": false },
                        "interval": { "type": "integer",  "default": 120, "description": "A random value to determine when to randomly move somewhere. This has a 1/interval chance to choose this goal" },
                        "angle_of_view_horizontal": { "type": "integer",  "default": 360, "description": "The angle in degrees that the mob can see in the Y-axis (up-down)" },
                        "angle_of_view_vertical": { "type": "integer",  "default": 360, "description": "The angle in degrees that the mob can see in the X-axis (left-right)" },
                        "probability": { "type": "number",  "default": 0.02, "description": "The probability of looking at the target. A value of 1.00 is 100%" },
                        "start_distance": { "type": "number",  "default": 10.0, "description": "This mob starts swelling when a target is at least this many blocks away" },
                        "must_see" : { "type": "boolean", "default": false },
                        "reselect_targets" : { "type": "boolean", "default": false },
                        "must_see_forget_duration" : { "type": "number", "default": 3.0 },
                        "target_search_height" : { "type": "number", "default": -1.0 },
                        "scan_interval" : { "type": "integer", "default": 10.0 },
                        "persist_time" : { "type": "number", "default": 3.0 },
                        "attack_interval" : { "type": "integer", "default": 0 },
                        "remove_child_entities" : { "type": "boolean", "description": "If true, all entities linked to this entity in a child relationship (eg. leashed) will also be despawned.", "default": false },
                        "trigger": {
                            "type": "object",
                            "properties": {
                                "filters": { "$ref": "#/definitions/filters", "description": "The list of conditions for this trigger" },
                                "event" : { "type": "string", "description": "The event to run when the conditions for this trigger are met" }, "target": { "type": "string","examples": [ "other", "player", "self", "target", "baby", "block"], "description": "The target of the event" }
                            }
                        },
                        "entity_types": {
                            "properties": {
                                "filters": { "$ref": "#/definitions/filters", "description": "Conditions that make this entry in the list valid" },
                                "max_dist" : { "type": "number", "default": 16, "description": "Maximum distance this mob can be away to be a valid choice" },
                                "must_see" : { "type": "boolean", "default": false, "description": "If true, the mob has to be visible to be a valid choice" },
                                "must_see_forget_duration" : {
                                    "type": "number", "default": 3.0,
                                    "description": "Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more"
                                },
                                "sprint_speed_multiplier" : { "type": "number", "default": 1.0, "description": "Multiplier for the running speed. A value of 1.0 means the speed is unchanged" },
                                "walk_speed_multiplier" : { "type": "number", "default": 1.0, "description": "Multiplier for the walking speed. A value of 1.0 means the speed is unchanged" }
                            }
                        },
                        "spawn_entity": {
                            "type": "object",
                            "properties": {
                                "filters": {
                                    "$ref": "#/definitions/filters"
                                },
                                "max_wait_time":{
                                    "type":  "integer",
                                    "description": "Maximum amount of time to randomly wait in seconds before another entity is spawned.",
                                    "default": 600
                                },
                                "min_wait_time": {
                                    "type":  "integer",
                                    "description": "Minimum amount of time to randomly wait in seconds before another entity is spawned.",
                                    "default": 300
                                },
                                "num_to_spawn":{
                                    "type":  "number",
                                    "description": "The number of entities of this type to spawn each time that this triggers.",
                                    "default": 1
                                },
                                "should_leash": {
                                    "type":  "boolean",
                                    "description": "If true, this the spawned entity will be leashed to the parent.",
                                    "default": false
                                },
                                "single_use":{
                                    "type":  "boolean",
                                    "description": "If true, this component will only ever spawn the specified entity once.",
                                    "default": false
                                },
                                "spawn_entity": {
                                    "type":  "string",
                                    "description": "Identifier of the entity to spawn, leave empty to spawn the item defined above instead."
                                },
                                "spawn_event":{
                                    "type":  "string",
                                    "description": "Event to call when the entity is spawned.",
                                    "default": "minecraft:entity_born"
                                },
                                "spawn_item": {
                                    "type":  "string",
                                    "description": "Item identifier of the item to spawn.",
                                    "default": "egg"
                                },
                                "spawn_method":{
                                    "type":  "string",
                                    "description": "Method to use to spawn the entity.",
                                    "default": "born"
                                },
                                "spawn_sound": {
                                    "type":  "string",
                                    "description": "Identifier of the sound effect to play when the entity is spawned.",
                                    "default": "plop"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
;

/**
 * Loads all component data
 * @param jsonData components data
 * @param postErrorMessage a function, which allows to show error messages
 * @returns {*} an array of EntityComponent instances to fill
 */
export function loadComponentData(jsonData, postErrorMessage) {
    let entity = [];
    for (const key in jsonData) {
        if (!componentLibrary[key]) {
            postErrorMessage("\nUndefined component \"" + key + "\"!");
            continue;
        }
        let items = componentLibrary[key].clone();
        items.data = jsonData[key];
        entity.push(items);
    }
    return entity;
}

/**
 * This function initializes all draggable components in left panel
 * @param componentLibrary a map of all components, where key is the ID of component and value is EntityComponent instance
 * @param componentList a list of all EntityComponent instances
 */
function fillComponentData(componentLibrary, componentList) {
    for (const id in fullSchema.definitions.library.components.properties) {
        componentLibrary[id] = new EntityComponent(id, fullSchema.definitions.library.components.properties[id]);
        componentList.push(componentLibrary[id]);
    }
}

/**
 * Function, which prepares the component group for export.
 * @param data a map, where key is the ID of the component and value is exported data from this component
 * @returns {*} processed data
 */
export function processData(data) {
    return data;
}

/**
 * Resolves the path and return the schema at this path
 * @param path a path in format #/path/to/the/schema
 * @returns {*} schema
 */
export function resolvePath(path) {
    let split = path.substring(2).split("/");
    let current = fullSchema;
    for (const s of split) {
        current = current[s];
    }
    return current;
}

/**
 * Returns empty value for given schema or default value, if specified.
 * @param schema schema
 * @returns {*} empty value
 */
export function getEmptyOfType(schema) {
    let def = schema.default;
    switch (schema.type) {
        case "string":
            return def ? def : "";
        case "object":
            return {};
        case "array":
        case "list":
            return def ? def : [];
        case "boolean":
            return def ? def === "true" : false;
        case "number":
        case "integer":
        case "decimal":
            return def ? def : 0;
    }
    return null;
}

export const componentLibrary = {};
export const componentList = [];

fillComponentData(componentLibrary, componentList);
