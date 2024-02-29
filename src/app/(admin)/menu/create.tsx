import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button'
import { defaultImage } from '@/components/ProductListItem'
import Colors from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router'

const CreateProductScreen = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState('')
    const [image, setImage] = useState<string | null>(null);
    const { id } = useLocalSearchParams()
    const isUpdate = !!id;
    const resetField = () => {
        setName('')
        setPrice('')
    }
    const validateInput = () => {
        if (!name) {
            setError('Name is required')
            return false
        }
        if (!price) {
            setError('Price is required')
            return false
        }
        if (isNaN(parseFloat(price))) {
            setError('Price must be a number')
            return false
        }
        return true
    }
    const onCreate = () => {
        console.warn('Creating product', name)
        if (!validateInput()) {
            return
        }

        resetField()
    }
    const onUpdate = () => {
        console.warn('Update product', name)
        if (!validateInput()) {
            return
        }

        resetField()
    }
    const onSubmit = () => {
       if (isUpdate) {
        onUpdate()
       }else{
        onCreate()
       } 

    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    const onDelete =() => {
        console.warn('Delete product', name)
    }
    const confirmDelete =() =>{
        Alert.alert('Confirm', 'Are you sure you want to delete',[
            {
                text:'Cancel'
            },
            {
                text:'Delete',
                style:'destructive',
                onPress: onDelete
            }
        ])
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: isUpdate ? 'update Product' : 'create Product' }} />
            <Image source={{ uri: image || defaultImage }} style={styles.image} />
            <Text onPress={pickImage} style={styles.selectText}>Select Image</Text>

            <Text style={styles.lable}>Name</Text>
            <TextInput
                placeholder='Name'
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.lable}>Price ($)</Text>
            <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder='9.99'
                style={styles.input}
                keyboardType='numeric'
            />
            <Text style={{ color: 'red' }}>{error}</Text>
            <Button onPress={onSubmit} text={isUpdate ? 'Update' : 'Create'} />
            {isUpdate && 
                <Text style={styles.selectText} onPress={confirmDelete}>
                    Delete
                </Text>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    lable: {
        color: 'gray',
        fontSize: 16

    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center'
    }, selectText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint
    }
})
export default CreateProductScreen