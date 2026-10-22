import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { TalentData } from "./PetData";

export const TalentList: TalentData[] = [
    new TalentData("t1", "残躯固守", "受到致命伤害，有概率保留1点血量"),
    new TalentData("t2", "瞬闪", "受到攻击概率闪避"),
    new TalentData("t3", "自愈", "每回合少量回血")
]


