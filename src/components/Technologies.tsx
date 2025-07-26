import { Autocomplete, Box, Chip, Stack, TextField, Typography } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

interface TechnologiesProps {
  techStack: string[];
}

interface TechnologiesRef {
  value: string;
}

const Technologies = forwardRef<TechnologiesRef, TechnologiesProps>(({ techStack }, ref) => {
    const [error, setError] = useState<string | null>(null);
    const [inputKey, setInputKey] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [selectedTechs, setSelectedTechs] = useState<string[]>(techStack);

    useImperativeHandle(ref, () => ({
        get value() {
            
            return selectedTechs.join(",");
        }
    }));

    const handleDelete = (technologyName: string) => setSelectedTechs(prev => prev.filter(e => e !== technologyName));

    return (
        <>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Autocomplete
                key={inputKey}
                freeSolo={false}
                inputValue={inputValue}
                onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
                onChange={(_, value) => {
                    const selectedTech = options.find((tech) => tech.name === value);

                    if (selectedTech) {
                        if(!selectedTechs.find(tech => tech === selectedTech.name)) {
                            setSelectedTechs(prev => [...prev, selectedTech.name]); 
                            setInputKey(prev => prev + 1);
                        }
                        else setError(selectedTech.name + " already exists");

                        setInputValue("");
                        setInputKey(prev => prev + 1);
                    }

                    else console.log("Invalid or custom input:", value);
                }}
                options={options.map((option) => option.name)}
                renderInput={(params) => <TextField {...params} label="Choose your technology" />}
            />
            { error && <Typography color="error"> { error } </Typography> }

            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                {selectedTechs.map((technologyName) => (
                <Chip
                    key={technologyName}
                    style={{ padding: 4 }}
                    label={technologyName}
                    size="small"
                    variant="outlined"
                    onDelete={() => handleDelete(technologyName)}
                    sx={{ mb: 0.5 }}
                />
                ))}
            </Stack>
        </Box>
        </>
    );
});

const options = [
  { id: 'js', name: 'JavaScript' },
  { id: 'ts', name: 'TypeScript' },
  { id: 'py', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'csharp', name: 'C#' },
  { id: 'go', name: 'Go' },
  { id: 'cpp', name: 'C++' },
  { id: 'php', name: 'PHP' },
  { id: 'ruby', name: 'Ruby' },
  { id: 'swift', name: 'Swift' },
  { id: 'kotlin', name: 'Kotlin' },
  { id: 'rust', name: 'Rust' },
  { id: 'scala', name: 'Scala' },
  { id: 'dart', name: 'Dart' },
  { id: 'sql', name: 'SQL' },
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },

  { id: 'react', name: 'React' },
  { id: 'angular', name: 'Angular' },
  { id: 'vue', name: 'Vue.js' },
  { id: 'svelte', name: 'Svelte' },
  { id: 'ember', name: 'Ember.js' },
  { id: 'jquery', name: 'jQuery' },
  { id: 'next', name: 'Next.js' },
  { id: 'nuxt', name: 'Nuxt.js' },
  { id: 'nest', name: 'NestJS' },
  { id: 'express', name: 'Express.js' },
  { id: 'fastify', name: 'Fastify' },
  { id: 'flask', name: 'Flask' },
  { id: 'django', name: 'Django' },
  { id: 'rails', name: 'Ruby on Rails' },
  { id: 'laravel', name: 'Laravel' },
  { id: 'spring', name: 'Spring Boot' },
  { id: 'aspnet', name: 'ASP.NET Core' },
  { id: 'phoenix', name: 'Phoenix (Elixir)' },
  { id: 'tornado', name: 'Tornado' },
  { id: 'fastapi', name: 'FastAPI' },

  { id: 'numpy', name: 'NumPy' },
  { id: 'pandas', name: 'Pandas' },
  { id: 'scipy', name: 'SciPy' },
  { id: 'tensorflow', name: 'TensorFlow' },
  { id: 'pytorch', name: 'PyTorch' },
  { id: 'spaCy', name: 'spaCy' },
  { id: 'sqlalchemy', name: 'SQLAlchemy' },
  { id: 'lodash', name: 'Lodash' },
  { id: 'd3', name: 'D3.js' },
  { id: 'chartjs', name: 'Chart.js' },
  { id: 'bootstrap', name: 'Bootstrap' },
  { id: 'rxjs', name: 'RxJS' },
  { id: 'three', name: 'Three.js' },

  { id: 'aws', name: 'AWS' },
  { id: 'azure', name: 'Microsoft Azure' },
  { id: 'gcp', name: 'Google Cloud Platform' },
  { id: 'firebase', name: 'Firebase' },
  { id: 'vercel', name: 'Vercel' },
  { id: 'netlify', name: 'Netlify' },
  { id: 'docker', name: 'Docker' },
  { id: 'kubernetes', name: 'Kubernetes' },
  { id: 'terraform', name: 'Terraform' },
  { id: 'ansible', name: 'Ansible' },

  { id: 'postgres', name: 'PostgreSQL' },
  { id: 'mysql', name: 'MySQL / MariaDB' },
  { id: 'mongodb', name: 'MongoDB' },
  { id: 'redis', name: 'Redis' },
  { id: 'cassandra', name: 'Apache Cassandra' },
  { id: 'dynamodb', name: 'Amazon DynamoDB' },

  { id: 'graphql', name: 'GraphQL' },
  { id: 'rest', name: 'REST APIs' },
  { id: 'apollo', name: 'Apollo GraphQL' },
  { id: 'swagger', name: 'Swagger / OpenAPI' },

  { id: 'vscode', name: 'Visual Studio Code' },
  { id: 'intellij', name: 'IntelliJ IDEA' },
  { id: 'vimplus', name: 'Vim / Neovim' },
  { id: 'emacs', name: 'Emacs' },
  { id: 'jetbrains', name: 'JetBrains Rider / WebStorm' },

  { id: 'git', name: 'Git' },
  { id: 'github', name: 'GitHub' },
  { id: 'gitlab', name: 'GitLab' },
  { id: 'bitbucket', name: 'Bitbucket' },

  { id: 'ci_cd', name: 'CI/CD (e.g. Jenkins, GitHub Actions)' },
  { id: 'circleci', name: 'CircleCI' },
  { id: 'travis', name: 'Travis CI' },

  { id: 'dockercomp', name: 'Docker Compose' },
  { id: 'helm', name: 'Helm' },
  { id: 'prometheus', name: 'Prometheus' },
  { id: 'grafana', name: 'Grafana' },

  { id: 'rabbitmq', name: 'RabbitMQ' },
  { id: 'kafka', name: 'Apache Kafka' },

  { id: 'elastic', name: 'Elasticsearch' },
  { id: 'kafka_streams', name: 'Kafka Streams' },
  { id: 'spark', name: 'Apache Spark' },
  { id: 'hadoop', name: 'Hadoop' },

  { id: 'unity', name: 'Unity' },
  { id: 'unreal', name: 'Unreal Engine' },

  { id: 'flutter', name: 'Flutter' },
  { id: 'react_native', name: 'React Native' },

  { id: 'electron', name: 'Electron' },

  { id: 'soap', name: 'SOAP Web Services' },

  { id: 'jenkins', name: 'Jenkins' },

  { id: 'babel', name: 'Babel' },
  { id: 'webpack', name: 'Webpack' },
  { id: 'rollup', name: 'Rollup' },
  { id: 'vite', name: 'Vite' },

  { id: 'eslint', name: 'ESLint' },
  { id: 'prettier', name: 'Prettier' },
  { id: 'jest', name: 'Jest' },
  { id: 'mocha', name: 'Mocha' },
  { id: 'cypress', name: 'Cypress' },

  { id: 'junit', name: 'JUnit' },
  { id: 'pytest', name: 'pytest' },

  { id: 'storybook', name: 'Storybook' }
];


export default Technologies;