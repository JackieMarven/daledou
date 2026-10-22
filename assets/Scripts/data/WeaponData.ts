import { _decorator, Component, Node } from 'cc';
import { WeaponData } from "./PetData";
const { ccclass, property } = _decorator;


export const WeaponList: WeaponData[] = [
    new WeaponData("w1", "木棍子", 8, 0.05, "普通木棍，基础攻击"),
    new WeaponData("w2", "碎石镖", 5, 0.2, "低伤害高暴击"),
    new WeaponData("w3", "重石块", 14, 0.02, "高伤害，暴击低"),
    new WeaponData("w4", "藤鞭", 7, 0.08, "命中降低对手灵动")
]



