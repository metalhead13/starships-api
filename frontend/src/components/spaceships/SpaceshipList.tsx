import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Spaceship } from "@shared/schema";

interface SpaceshipListProps {
  spaceships: Spaceship[];
}

export default function SpaceshipList({ spaceships }: SpaceshipListProps) {
  if (spaceships.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No spaceships found
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {spaceships.map((ship) => (
        <Link key={ship.id} href={`/spaceship/${ship.id}`}>
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="truncate">{ship.name}</span>
                <Badge variant={ship.status === "Active" ? "default" : "destructive"}>
                  {ship.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <dt className="font-medium">Type</dt>
                  <dd>{ship.type}</dd>
                </div>
                <div>
                  <dt className="font-medium">Class</dt>
                  <dd>{ship.class}</dd>
                </div>
                <div>
                  <dt className="font-medium">Crew</dt>
                  <dd>{ship.crew.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="font-medium">Length</dt>
                  <dd>{ship.length.toLocaleString()}m</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
