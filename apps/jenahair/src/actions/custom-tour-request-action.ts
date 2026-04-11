'use server';

import { ICreateCustomTourRequest, ICustomTourRequestResponse } from '@/interfaces/custom-tour-request-interface';
import { ActionResponse } from '@/interfaces/_base-interface';
import { createTourCategoryCustomTourRequestActionPrivate } from './tour-category-custom-tour-request-action';
import { revalidatePath } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  getAllCustomTourRequestsAdminApiPrivate,
  createCustomTourRequestApiPublic,
  deleteCustomTourRequestApiPrivate,
} from '@/apis/custom-tour-request-apis';

export async function getAllCustomTourRequestsActionPrivate(): Promise<ActionResponse<ICustomTourRequestResponse[]>> {
  const result = await executeApi(
    async () => getAllCustomTourRequestsAdminApiPrivate()
  );
  return result;
}

export async function submitCustomTourRequestActionPublic(formData: FormData): Promise<ActionResponse<void>> {
  try {
    // Extract form data
    const startDate = new Date(formData.get('startDate') as string);
    const endDate = new Date(formData.get('endDate') as string);
    const adultCount = parseInt(formData.get('adultCount') as string);
    const childCount = parseInt(formData.get('childCount') as string);
    const destinations = JSON.parse(formData.get('destinations') as string) as string[];
    const tourCategoryIds = JSON.parse(formData.get('tourCategoryIds') as string) as string[];
    const hotelType = formData.get('hotelType') as string;
    const roomType = formData.get('roomType') as string;
    const customerName = formData.get('customerName') as string;
    const customerEmail = formData.get('customerEmail') as string;
    const customerPhone = formData.get('customerPhone') as string;
    const customerNotes = formData.get('customerNotes') as string || undefined;
    const captchaToken = formData.get('captchaToken') as string;

    // Validate required fields
    if (!customerEmail || !customerName || !customerPhone) {
      return { success: false, error: 'Name, email, and phone are required' };
    }

    if (!startDate || !endDate) {
      return { success: false, error: 'Start date and end date are required' };
    }

    // Validate reCAPTCHA token presence
    if (!captchaToken) {
      return { success: false, error: 'Please complete the reCAPTCHA' };
    }

    // Create custom tour request data (backend will verify reCAPTCHA)
    const customTourRequestData: ICreateCustomTourRequest = {
      startDate,
      endDate,
      adultCount,
      childCount,
      destinations,
      hotelType,
      roomType,
      customerName,
      customerEmail,
      customerPhone,
      customerNotes,
      recaptchaToken: captchaToken,
    };

    const result = await executeApi(
      async () => createCustomTourRequestApiPublic(customTourRequestData)
    );

    if (!result.success || !result.data) {
      return result as ActionResponse<void>;
    }

    const customTourRequest = result.data;

    // Create tour category custom tour request relations
    if (tourCategoryIds && tourCategoryIds.length > 0) {
      for (const tourCategoryId of tourCategoryIds) {
        await createTourCategoryCustomTourRequestActionPrivate({
          customTourRequestId: customTourRequest.id,
          tourCategoryId: tourCategoryId,
        });
      }
    }

    revalidatePath('/adminup', 'layout');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit custom tour request. Please try again.'
    };
  }
}

export async function deleteCustomTourRequestActionPrivate(id: string): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteCustomTourRequestApiPrivate(id)
  );
  revalidatePath('/adminup', 'layout');
  return result;
}
