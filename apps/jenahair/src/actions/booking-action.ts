'use server';

import { ICreateBooking, IBookingResponse } from '@/interfaces/booking-interface';
import { ActionResponse } from '@/interfaces/_base-interface';
import { revalidatePath } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  getAllBookingsAdminApiPrivate,
  createBookingApiPublic,
  deleteBookingApiPrivate,
} from '@/apis/booking-apis';

export async function getAllBookingsActionPrivate(): Promise<ActionResponse<IBookingResponse[]>> {
  return executeApi(
    async () => getAllBookingsAdminApiPrivate()
  );
}

export async function submitBookingActionPublic(formData: FormData): Promise<ActionResponse<void>> {
  try {
    // Extract form data
    const tourId = formData.get('tourId') as string;
    const adultCount = parseInt(formData.get('adultCount') as string);
    const childCount = parseInt(formData.get('childCount') as string);
    const adultPrice = parseFloat(formData.get('adultPrice') as string);
    const childPrice = parseFloat(formData.get('childPrice') as string);
    const totalPrice = parseFloat(formData.get('totalPrice') as string);
    const customerName = formData.get('customerName') as string;
    const customerEmail = formData.get('customerEmail') as string;
    const customerPhone = formData.get('customerPhone') as string;
    const customerNotes = formData.get('customerNotes') as string || undefined;
    const captchaToken = formData.get('captchaToken') as string;

    // Validate required fields
    if (!customerEmail || !customerName || !customerPhone) {
      return { success: false, error: 'Name, email, and phone are required' };
    }

    if (!tourId) {
      return { success: false, error: 'Tour ID is required' };
    }

    // Validate reCAPTCHA token presence
    if (!captchaToken) {
      return { success: false, error: 'Please complete the reCAPTCHA' };
    }

    // Create booking data (backend will verify reCAPTCHA)
    const bookingData: ICreateBooking = {
      tourId,
      adultCount,
      childCount,
      adultPrice,
      childPrice,
      totalPrice,
      customerName,
      customerEmail,
      customerPhone,
      customerNotes,
      recaptchaToken: captchaToken,
    };

    const result = await executeApi(
      async () => createBookingApiPublic(bookingData)
    );

    if (!result.success) {
      return result as ActionResponse<void>;
    }

    revalidatePath('/adminup', 'layout');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit booking. Please try again.'
    };
  }
}

export async function deleteBookingActionPrivate(id: string): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteBookingApiPrivate(id)
  );
  revalidatePath('/adminup', 'layout');
  return result;
}
