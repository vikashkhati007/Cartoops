import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { userId, name, email, profileImage } = body;

    // Check if userId is provided
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Update user profile in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name || undefined,           // Update name only if it's provided
        email: email || undefined,         // Update email only if it's provided
        profileImage: profileImage || undefined,  // Update profile image only if it's provided
      },
    });

    return NextResponse.json(
      {
        message: 'Profile updated successfully',
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Error updating profile' },
      { status: 500 }
    );
  }
}
