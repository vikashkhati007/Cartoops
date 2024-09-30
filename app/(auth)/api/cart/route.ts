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
    const { userId, productId, title, price, image } = body;

    // Add new cart item to the user
    const newCartItem = await prisma.cartItems.create({
      data: {
        productId: productId,
        title: title,
        price: price,
        image: image,
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


export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const cartItemId = searchParams.get('cartItemId'); // Get cartItemId from query params

    if (!cartItemId) {
      return NextResponse.json({ error: 'Cart item ID is required' }, { status: 400 });
    }

    // Delete the cart item
    const deletedCartItem = await prisma.cartItems.delete({
      where: {
        id: cartItemId,
      },
    });

    // Return a success response
    return NextResponse.json(
      {
        message: 'Cart item deleted successfully',
        deletedCartItem,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting cart item:', error);
    return NextResponse.json({ error: 'Error deleting cart item' }, { status: 500 });
  }
}


export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { cartItemId, quantity } = body;

    if (!cartItemId || !quantity) {
      return NextResponse.json(
        { error: 'Cart item ID and quantity are required' },
        { status: 400 }
      );
    }

    // Update the quantity of the cart item
    const updatedCartItem = await prisma.cartItems.update({
      where: { id: cartItemId },
      data: { quantity: quantity },
    });

    return NextResponse.json(
      {
        message: 'Cart item quantity updated successfully',
        updatedCartItem,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    return NextResponse.json(
      { error: 'Error updating cart item quantity' },
      { status: 500 }
    );
  }
}
