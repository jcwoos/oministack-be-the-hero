import React, { Component, useEffect, useState } from 'react';
import { View, FlatList, Image, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import logoImg from '../../assets/logo.png';
import style from './style';
export default function Incidents() {
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    function loadIncidents() {
        api.get('incidents?page=' + page).then(r => {
            setIncidents([...incidents, ...r.data]);
            setTotal(r.headers['x-total-count']);
            setLoading(false);
            setPage(page + 1)
        }, () => setLoading(false));
    }
    useEffect(() => {
        if (loading) { return; }
        if (total > 0 && total === incidents.length) { return; }
        setLoading(true);

    }, []);

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                <View style={style.headerText}>
                    <Text>
                        Total de <Text style={style.headerTextBold} >{total} casos</Text>.
                    </Text>
                </View>
            </View>
            <Text style={style.title}>Bem-vindo!</Text>
            <Text style={style.description}>Escolha um dos casos abaixo e salve o dia!</Text>
            <FlatList
                style={style.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={style.incident}>
                        <Text style={style.incidentProperty}>ONG:</Text>
                        <Text style={style.incidentValue}>{incident.name}</Text>
                        <Text style={style.incidentProperty}>Caso:</Text>
                        <Text style={style.incidentValue}>{incident.description}</Text>
                        <Text style={style.incidentProperty}>Valor:</Text>
                        <Text style={style.incidentValue}>{Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })
                            .format(incident.value)}</Text>
                        <TouchableOpacity style={style.detailButton} onPress={() => navigateToDetail(incident)}>
                            <Text style={style.detailButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color='#e02041' />
                        </TouchableOpacity>
                    </View>
                )} />
        </View>
    );
}