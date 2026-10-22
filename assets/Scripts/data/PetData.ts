import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PetData')
export class PetData {

    name: string;           // 昵称
    level: number = 1;      // 等级
    spritePath: string;     // 资源路径

    maxHp: number = 100;    // 血量
    power: number = 6;      // 力量
    agile: number = 5;      // 敏捷
    speed: number = 6;      // 速度
    attack: number = 10;      // 攻击力

    weapons: WeaponData[] = [];
    talents: TalentData[] = [];

    constructor(name: string, spritePath: string = "", level: number = 1, maxHp: number = 100, power: number = 6, agile: number = 5, speed: number = 6) {
        this.name = name;
        this.level = level;
        this.spritePath = spritePath;
        this.maxHp = maxHp;
        this.power = power;
        this.agile = agile;
        this.speed = speed;
        this.attack += this.power * 0.5;
    }

}

/**
 * 武器
 */
export class WeaponData {
    name: string; // 武器名称
    level: number = 1; // 武器等级
    id: string;
    desc: string;
    baseDmg: number;
    critRate: number;

    constructor(id: string, name: string, baseDmg: number, critRate: number, desc: string) {
        this.id = id;
        this.name = name;
        this.baseDmg = baseDmg;
        this.critRate = critRate;
        this.desc = desc;
    }
}

/**
 * 天赋
 */
export class TalentData {
    name: string;
    level: number = 1;
    id: string;
    desc: string;

    constructor(id: string, name: string, desc: string) {
        this.id = id;
        this.name = name;
        this.desc = desc;
    }
}






