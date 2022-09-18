import {View, Image, FlatList} from "react-native";

import logoImg from "../../assets/logo-nlw-esports.png";

import {Heading} from "../../components/Heading";
import {GameCard} from "../../components/GameCard";

import {GAMES} from "../../utils/games";
import {styles} from "./style";

export function Home() {
    return (
        <View style={styles.container}>
            <Image source={logoImg} style={styles.logo}/>
            <Heading
                title="Encontre o sue duo!"
                subtitle="Selecione o game que deseja jogar..."
            />
            <FlatList
                data={GAMES}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <GameCard data={item}/>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentList}
            />
        </View>
    );
}
