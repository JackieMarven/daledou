import { _decorator, Component, Node, Sprite, Label, Color, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
import { PetData } from './data/PetData';
import { PlayerPet, EnemyPet } from "./data/PlayerInfo";
import { BattleState } from './constants/BattleConstants';


@ccclass('BattleEngine')
export class BattleEngine extends Component {

    // 当前玩家节点
    @property(Node)
    playerPetNode: Node = null;
    // 敌人节点
    @property(Node)
    enemyPetNode: Node = null;

    // ========== 血条绑定 ==========
    @property(Sprite)
    playerHpFill: Sprite = null!;
    @property(Sprite)
    enemyHpFill: Sprite = null!;
    // 血量文本
    @property(Label)
    playerHpLabel: Label = null!;
    @property(Label)
    enemyHpLabel: Label = null!;

    // 伤害飘字根节点
    @property(Node)
    damageRoot: Node = null!;

    // ========== 【新增：头像、昵称】 ==========
    @property(Sprite)
    playerAvatar: Sprite = null!;
    @property(Label)
    playerNameLabel: Label = null!;

    @property(Sprite)
    enemyAvatar: Sprite = null!;
    @property(Label)
    enemyNameLabel: Label = null!;


    // 对战双方对象
    playerData: PetData;
    enemyData: PetData;

    private battleState: BattleState = BattleState.IDLE;
    // 玩家初始位置
    private playerOriginX: number;
    // 敌人初始位置
    private enemyOriginX: number;
    // 玩家当前血量
    private playerCurHp: number;
    // 敌人当前血量
    private enemyCurHp: number;

    /**
     * 生命周期 start
     */
    start() {

        // 初始化用户信息
        this.initUserInfo();
        // 初始化战斗数据
        this.initData();
        console.log(`玩家宠物【${this.playerData.name}】登场`);
        // 开始战斗
        this.startBattle();
    }

    /**
     * 初始化用户信息
     */
    initUserInfo() {
        
    }


    /**
     * 初始化战斗数据
     */
    initData() {
        this.playerData = { ...PlayerPet };
        this.enemyData = { ...EnemyPet };
        this.playerOriginX = this.playerPetNode.position.x;
        this.enemyOriginX = this.enemyPetNode.position.x;
        this.playerCurHp = this.playerData.maxHp;
        this.enemyCurHp = this.enemyData.maxHp;

        // 初始化血条显示
        this.updateHpBar(this.playerHpFill, this.playerHpLabel, this.playerCurHp, this.playerData.maxHp);
        this.updateHpBar(this.enemyHpFill, this.enemyHpLabel, this.enemyCurHp, this.enemyData.maxHp);
    }


    /**
     * 开始战斗
     */
    startBattle() {
        // 延迟一帧启动战斗，避开加载冲突
        this.scheduleOnce(() => {
            this.nextTurn();
        }, 0.1);
    }

    // 切换下一回合
    nextTurn() {
        if (this.playerCurHp <= 0 || this.enemyCurHp <= 0) {
            this.battleState = BattleState.BATTLE_END;
            if (this.playerCurHp <= 0) {
                console.log("战斗结束，玩家战败");
            } else {
                console.log("战斗结束，玩家胜利！");
            }
            return;
        }

        if (this.battleState === BattleState.IDLE || this.battleState === BattleState.ENEMY_TURN) {
            this.playerTurn();
        }
        else if (this.battleState === BattleState.PLAYER_TURN) {
            this.enemyTurn();
        }

    }

    // 玩家回合
    playerTurn() {
        this.battleState = BattleState.PLAYER_TURN;

        // 小猫向前冲刺动画
        tween(this.playerPetNode)
            .to(0.3, { position: new Vec3(this.playerOriginX + 300, this.playerPetNode.position.y, this.playerPetNode.position.z) })
            .to(0.3, { position: new Vec3(this.playerOriginX, this.playerPetNode.position.y, this.playerPetNode.position.z) })
            .start();

        // 计算伤害
        let damage = Math.max(1, this.playerData.attack);
        this.enemyCurHp -= damage;
        console.log(`${this.playerData.name}发起攻击，造成${damage}伤害！敌人剩余HP:${this.enemyCurHp}`)
        // 更新血条显示
        this.updateHpBar(this.enemyHpFill, this.enemyHpLabel, this.enemyCurHp, this.enemyData.maxHp);
        // 显示伤害飘字
        this.showDamageText(this.enemyPetNode, damage, new Color(255, 0, 0));

        // 等待1秒后，进入敌方回合
        this.scheduleOnce(() => {
            this.nextTurn();
        }, 1.0);
    }

    // 敌方回合
    enemyTurn() {
        this.battleState = BattleState.ENEMY_TURN;

        // 小猫向前冲刺动画
        tween(this.enemyPetNode)
            .to(0.3, { position: new Vec3(this.enemyOriginX - 300, this.enemyPetNode.position.y, this.enemyPetNode.position.z) })
            .to(0.3, { position: new Vec3(this.enemyOriginX, this.enemyPetNode.position.y, this.enemyPetNode.position.z) })
            .start();

        let damage = Math.max(1, this.enemyData.attack);
        this.playerCurHp -= damage;
        console.log(`${this.enemyData.name}发起攻击，造成${damage}伤害！玩家剩余HP:${this.playerCurHp}`)

        // 显示伤害飘字
        this.showDamageText(this.playerPetNode, damage, new Color(255, 0, 0));
        // 更新血条显示
        this.updateHpBar(this.playerHpFill, this.playerHpLabel, this.playerCurHp, this.playerData.maxHp);

        this.scheduleOnce(() => {
            this.nextTurn();
        }, 1.0);
    }

    /**
     * 更新血条显示
     * @param hpFill 血条
     * @param hpLabel 血条文本
     * @param currentHp 当前血量
     * @param maxHp 最大血量
     */
    updateHpBar(hpFill: Sprite, hpLabel: Label, currentHp: number, maxHp: number) {
        // 玩家血条比例
        const playerRate = currentHp / maxHp;
        hpFill.fillRange = playerRate;
        if (currentHp < 0) currentHp = 0;
        hpLabel.string = `${currentHp}/${maxHp}`;
    }

    /**
     * 显示伤害飘字
     * @param targetNode 目标节点
     * @param damage 伤害值
     * @param color 颜色
     */
    showDamageText(targetNode: Node, damage: number, color: Color) {
        const txtNode = new Node("damageTxt");
        const label = txtNode.addComponent(Label);
        label.string = `-${damage}`;
        label.color = color;
        label.fontSize = 36;
        txtNode.parent = this.damageRoot;
        txtNode.setPosition(targetNode.position.x, targetNode.position.y + 100, 0);

        // 飘字向上淡出动画
        tween(txtNode)
            .to(1.0, { position: new Vec3(txtNode.position.x, txtNode.position.y + 120, 0) })
            .call(() => {
                txtNode.destroy();
            })
            .start();
    }

}
