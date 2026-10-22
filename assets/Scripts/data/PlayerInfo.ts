import { _decorator, Component, Node } from 'cc';
import { PetData } from './PetData';
const { ccclass, property } = _decorator;

// 玩家角色
export const PlayerPet = new PetData("小可爱", "texture/player/player-cat", 1, 100, 6, 5, 6);
// 敌方角色
export const EnemyPet = new PetData("小坏蛋", "texture/enemy/enemy-cat", 1, 100, 6, 5, 6);


