import React from 'react';
import { View, Linking, Image, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import logoImg from '../../assets/logo.png';
import style from './style';
export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;
    const value = Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
        .format(incident.value);
    const message = `Olá ${incident.name}, estou entrando em contato, pois gostaria de ajudar no caso "${incident.title}", com o valor de ${value}`;
    function navigateBack() {
        navigation.goBack();
    }
    function sendEmail() {
        MailComposer.composeAsync({
            subject: `Herói do caso ${incident.title}`,
            recipients: [incident.email],
            body: message
        });
    }
    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }
    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                <TouchableOpacity style={style.detailButton} onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color='#e02041' />
                </TouchableOpacity>
            </View>
            <View style={style.incident}>
                <Text style={[style.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={style.incidentValue}>{incident.title}</Text>
                <Text style={style.incidentProperty}>Caso:</Text>
                <Text style={style.incidentValue}>{incident.description}</Text>
                <Text style={style.incidentProperty}>Valor:</Text>
                <Text style={style.incidentValue}>{value}</Text>
            </View>
            <View style={style.contactBox}>
                <Text style={style.heroTitle}>Salve o dia!</Text>
                <Text style={style.heroTitle}>Seja o herói desse caso.</Text>
                <Text style={style.heroDescription}>Entre em contato.</Text>
                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={sendWhatsapp}>
                        <Text style={style.actionText}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.action} onPress={sendEmail}>
                        <Text style={style.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}