import { kataEntity } from '../entities/Kata.entity';

import { LogSuccess, LogError } from "../../utils/logger";
import { IKata  } from "../interfaces/IKata.interface";


// CRUD

/**
 * Method to obtain all Katas from Collection "Katas" in Mongo Server
 */
export const getAllKatas = async (page: number, limit: number): Promise<any[] | undefined> => {
    try {
        let kataModel = kataEntity();

        let response: any = {};

        // Search all Katas (using pagination)
        await kataModel.find({isDeleted: false})
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((katas: IKata[]) => {
                response.katas = katas;
            });
        
        // Count total documents in collection "Katas"
        await kataModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });

        return response;

    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Katas: ${error}`);
    }
}

// - Get Kata By ID
export const getKataByID = async (id: string) : Promise<any | undefined> => {

    try {
        let kataModel = kataEntity();

        // Search Kata By ID
        return await kataModel.findById(id)

    } catch (error) {
        LogError(`[ORM ERROR]: Getting Kata By ID: ${error}`);
    }

}

// - Delete Kata By ID
export const deleteKataByID = async (id: string): Promise<any | undefined> => {

    try {
        let kataModel = kataEntity();

        // Delete Kata BY ID
        return await kataModel.deleteOne({ _id: id })

    } catch (error) {
        LogError(`[ORM ERROR]: Deleting Kata By ID: ${error}`);
    }

}

// - Create New Kata
export const createKata = async (kata: IKata): Promise<any | undefined> => {

    try {
        
        let kataModel = kataEntity();

        // Create / Insert new Kata
        return await kataModel.create(kata);

    } catch (error) {
        LogError(`[ORM ERROR]: Creating Kata: ${error}`);
    }

}

// - Update Kata By ID
export const updateKataByID = async (id: string, kata: IKata): Promise<any | undefined> => {

    try {
        
        let kataModel = kataEntity();

        // Update Kata
        return await kataModel.findByIdAndUpdate(id, kata);

    } catch (error) {
        LogError(`[ORM ERROR]: Updating Kata ${id}: ${error}`);
    }

}

export const getKatasFilter = async (level: any): Promise<any | undefined> =>{

    try {
        let kataModel = kataEntity()

        const response = await kataModel.find(level)

        return response

    } catch (error) {
        LogError(`[ORM ERROR]: Filting Kata ${level}: ${error}`);
    }
}

export const getKatasRecent = async (): Promise<any | undefined> => {

    try {
        let kataModel = kataEntity()

        const response = await kataModel.find().sort({$natural:-1}).limit(5)

        return response

    } catch (error) {
        LogError(`[ORM ERROR]: Get Recent Katas: ${error}`);
    }

}

export const getKatasOrderByBest = async (): Promise<any | undefined> => {

    try {
        let kataModel = kataEntity()

        const response = await kataModel.find().sort({level: 1})

        return response
    } catch (error) {
        LogError(`[ORM ERROR]: Get Best Katas: ${error}`);
    }

}

export const getKatasByIntent = async (): Promise<any | undefined> => {

    try {
        let kataModel = kataEntity()

        const response = await kataModel.find().sort({intents: 1})

        return response
        
    } catch (error) {
        LogError(`[ORM ERROR]: Get Katas By Intent: ${error}`);
    }

}