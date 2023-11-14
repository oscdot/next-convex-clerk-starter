import { RoomList } from '@/components/features/rooms/room-list'

const Home = () => {
  return (
    <main className="flex items-center justify-center p-20">
      <div className="w-full space-y-2 px-10 md:w-2/3 xl:w-1/3">
        <RoomList />
      </div>
    </main>
  )
}

export default Home
