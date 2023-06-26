import { View, Text } from 'react-native'
import React from 'react'
import { Card } from 'react-native-elements'
import TagButton from '../components/TagButton'
import { fonts } from '../../values/fonts'
import { colors } from '../../values/colors'

export default function TalentCommunityCard(props) {
    return (
        <Card containerStyle={{ borderRadius: 6, backgroundColor: colors.blueCom, borderColor: colors.blueCom, marginHorizontal: 10 }}>
            <View>
                <Text style={{ fontWeight: '900', lineHeight: 38, color: colors.white, fontSize: 16 }}>We’re always on the lookout for Talent</Text>
            </View>
            <View style={{ width: '90%' }}>
                <Text style={{ fontWeight: '400', color: colors.white, fontSize: 12 }}>If you are thinking about a future with us, sign up to stay connected and be informed of any new opportunities</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <TagButton
                    title={'Join our Talent Community'}
                    onPress={props.onJoin}
                    buttonStyle={{ backgroundColor: colors.lightgreen, borderColor: colors.lightgreen }}
                    titleStyle={{ color: '#fff' }}
                    size={'large'}
                    containerStyle={{ borderRadius: 10 }}
                    parentStyle={{ marginRight: 0 }}
                />
            </View>
        </Card>
    )
}