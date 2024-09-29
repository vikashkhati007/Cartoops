import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession } from '@/db/auth';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  // Get session to ensure user is authenticated
  const session = await getSession();

  // If user is not logged in, return unauthorized response
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { productId, title, price, image, description } = await req.json();

  // Validate required fields
  if (!productId || !title || !price || !description || !image) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    // Find the user by email from the session
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create a new favorite item in the database
    const favoriteItem = await prisma.favoriteItems.create({
      data: {
        productId,
        title,
        price,
        image,
        description,
        userId: user.id,
      },
    });

    return NextResponse.json({ message: 'Favorite item added successfully', favoriteItem });
  } catch (error) {
    console.error('Error adding favorite item:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}




export async function GET() {
  // Get session to ensure user is authenticated
 
  const session = await getSession();

  // If user is not logged in, return unauthorized response
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Find the user by email from the session
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! },
      include: {
        favoriteitems: true, // Include the user's favorite items
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ favoriteItems: user.favoriteitems });
  } catch (error) {
    console.error('Error fetching favorite items:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  // Get session to ensure user is authenticated
  const session = await getSession();

  // If user is not logged in, return unauthorized response
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get the URL and extract the 'id' from query params
  const url = new URL(req.url);
  const favoriteItemId = url.searchParams.get('id');

  if (!favoriteItemId) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    // Find the user by email from the session
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find the favorite item by its ID and make sure it belongs to the user
    const favoriteItem = await prisma.favoriteItems.findUnique({
      where: { id: favoriteItemId },
    });

    if (!favoriteItem || favoriteItem.userId !== user.id) {
      return NextResponse.json({ error: 'Favorite item not found or does not belong to the user' }, { status: 404 });
    }

    // Delete the favorite item
    await prisma.favoriteItems.delete({
      where: { id: favoriteItemId },
    });

    return NextResponse.json({ message: 'Favorite item deleted successfully' });
  } catch (error) {
    console.error('Error deleting favorite item:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}