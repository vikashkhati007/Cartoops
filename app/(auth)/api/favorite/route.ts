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
  console.log(session?.user?.email);

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
