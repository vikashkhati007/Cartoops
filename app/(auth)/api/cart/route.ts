import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId'); // Get userId from query params

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Fetch cart items for the user
    const cartItems = await prisma.cartItems.findMany({
      where: {
        userId: userId, // Filter by userId
      },
    });

    // Return the cart items in the response
    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return NextResponse.json({ error: 'Error fetching cart items' }, { status: 500 });
  }
}


export async function POST(req: any) {
  try {
    const body = await req.json();
    const { userId, productId, title, price, image, quantity } = body;

    // Add new cart item to the user
    const newCartItem = await prisma.cartItems.create({
      data: {
        productId: productId,
        title: title,
        price: price,
        image: image,
        quantity: quantity,
        // Use 'User' (uppercase 'U') to connect the user
        User: {
          connect: { id: userId }, // This references the existing user
        },
      },
    });

    // Return the new cart item in the response
    return NextResponse.json({
      message: 'Cart item added successfully',
      newCartItem,
    }, { status: 201 });

  } catch (error) {
    console.error('Error adding cart item:', error);
    return NextResponse.json({
      error: 'Error adding cart item',
    }, { status: 500 });
  }
}
