import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SpaceshipList from "@/components/spaceships/SpaceshipList";
import SpaceshipForm from "@/components/spaceships/SpaceshipForm";
import { type Spaceship, spaceshipTypes } from "@shared/schema";

export default function Dashboard() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: spaceships, isLoading } = useQuery<Spaceship[]>({
    queryKey: ["/api/spaceships"]
  });

  const filteredSpaceships = spaceships?.filter((ship) => {
    const matchesType = selectedType === "all" || ship.type === selectedType;
    const matchesSearch = ship.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  if (isLoading) {
    return <div className="p-4">
      <Skeleton className="h-8 w-[200px] mb-4" />
      <div className="grid gap-4">
        {Array(3).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    </div>;
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Imperial Fleet Management</h1>
        <input
          type="search"
          placeholder="Search spaceships..."
          className="px-4 py-2 rounded bg-background border"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="view">
        <TabsList>
          <TabsTrigger value="view">View Fleet</TabsTrigger>
          <TabsTrigger value="add">Add Spaceship</TabsTrigger>
        </TabsList>
        
        <TabsContent value="view">
          <div className="mb-4">
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 rounded bg-background border"
            >
              <option value="all">All Types</option>
              {spaceshipTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <SpaceshipList spaceships={filteredSpaceships || []} />
        </TabsContent>
        
        <TabsContent value="add">
          <SpaceshipForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
