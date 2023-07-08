<template>
    <div class="playList">
        <div class="song" v-for="item in playList" :key="item.id">
            <div class="fl">
                <!-- <div v-if="showNum" :class="{ top3: index <= 2 }" class="rank"> -->
                    <!-- {{ index >= 9 ? index + 1 : "0" + (index + 1) }} -->
                <!-- </div> -->
                <!-- <div v-if="showOrder" class="rank">
                    {{ index + 1 }}
                </div> -->
                <div class="content">
                    <!-- 歌曲名 -->
                    <div class="name">
                        <span>{{ item.name }}</span>
                        <!-- <span class="alias" v-if="item.song.alias.length">({{ item.song.alias[0] }})</span> -->
                    </div>

                    <!-- 歌手和专辑 -->
                    <!-- <div class="artist">
                        <i class="maxBr" v-if="item.song.privilege.maxbr > 320000"></i>
                        <span v-for="(artist, i) in item.song.artists" :key="i">
                            {{ artist.name }}
                            <i v-if="i !== item.song.artists.length - 1">/</i>
                        </span>
                        - <span class="album-name">{{ item.song.album.name }}</span>
                    </div> -->
                </div>
            </div>
            <!-- 右边播放 -->
            <!-- <div class="fr">
                <span></span>
            </div> -->
        </div>
    </div>
</template>
<style lang="scss" scoped>
.playList {
    padding-left: 10px;

    .song {
        display: flex;
        border-bottom: 1px solid rgba(199, 171, 171, 0.2);
        margin: 10px 0;
        justify-content: space-between;

        .fl {
            flex: 1 1 auto;
            width: 0;
            padding: 6px 0;
            display: flex;

            .rank {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                font-size: 17px;
                color: #999;
                margin-left: -10px;
            }

            .top3 {
                color: #df3436;
            }

            .content {
                flex: 1 1 auto;
                width: 0;

                .name {
                    font-size: 17px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    word-break: normal;

                    .alias {
                        color: #888;
                        margin-left: 4px;
                    }
                }
            }

            .artist {
                font-size: 12px;
                color: #888;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-break: normal;

                .maxBr {
                    display: inline-block;
                    width: 12px;
                    height: 8px;
                    margin-right: 4px;
                    background: url(../assets/index_icon_2x.png) no-repeat;
                    background-size: 166px 97px;
                }
            }
        }

        .fr {
            padding: 0 10px;
            display: flex;
            align-items: center;

            span {
                display: inline-block;
                width: 22px;
                height: 22px;
                background: url(../assets/index_icon_2x.png) no-repeat;
                background-position: -24px 0px;
                background-size: 166px 97px;
            }
        }
    }
}
</style>
<script>
import { mapMutations,mapState } from 'vuex';

export default {
    name: "musicList",
    props: {
        // musicList: {
        //     type: Array,
        //     default: () => {
        //         return [];
        //     },
        // },
        // showNum: {
        //     type: Boolean,
        //     default: false,
        // },
        // showOrder: {
        //     type: Boolean,
        //     default: false,
        // },
    },
    computed: {
        ...mapState(['playList', 'playListTndex'])
    },
    methods: {
        ...mapMutations(['updatePlayListTndex', 'updatePlayList']),
        // play(music, index) {
        //     this.$emit("aaa", music);
        //     this.updatePlayListTndex(index);
        //     this.updatePlayList(music);
        // },
    },
};
</script>