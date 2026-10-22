/**
 * 战斗状态枚举
 */
export enum BattleState {
    IDLE,           // 空闲：战斗未开始/等待初始化
    PLAYER_TURN,    // 玩家回合：玩家操作阶段
    ENEMY_TURN,     // 敌人回合：敌人AI行动阶段
    BATTLE_END      // 战斗结束：结算、胜负判定
}