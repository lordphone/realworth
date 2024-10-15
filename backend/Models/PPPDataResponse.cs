using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace RealWorthspace.Models
{
    public class PPPDataResponse
    {
        [JsonPropertyName("meta")]
        public MetaData Meta { get; set; }

        [JsonPropertyName("data")]
        public DataSection Data { get; set; }
    }

    public class MetaData
    {
        [JsonPropertyName("schema")]
        public string Schema { get; set; }

        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("prepared")]
        public DateTime Prepared { get; set; }

        [JsonPropertyName("contentLanguages")]
        public List<string> ContentLanguages { get; set; }

        [JsonPropertyName("sender")]
        public Sender Sender { get; set; }
    }

    public class Sender
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }
    }

    public class DataSection
    {
        [JsonPropertyName("dataSets")]
        public List<DataSet> DataSets { get; set; }

        [JsonPropertyName("structures")]
        public List<Structure> Structures { get; set; }
    }

    public class DataSet
    {
        [JsonPropertyName("structure")]
        public int Structure { get; set; }

        [JsonPropertyName("action")]
        public string Action { get; set; }

        [JsonPropertyName("links")]
        public List<Link> Links { get; set; }

        [JsonPropertyName("dimensionGroupAttributes")]
        public Dictionary<string, List<int>> DimensionGroupAttributes { get; set; }

        [JsonPropertyName("series")]
        public Dictionary<string, Series> Series { get; set; }
    }

    public class Link
    {
        [JsonPropertyName("urn")]
        public string Urn { get; set; }

        [JsonPropertyName("rel")]
        public string Rel { get; set; }
    }
    
    public class Structure
    {
        
    }

    public class Series
    {
        [JsonPropertyName("attributes")]
        public List<int?> Attributes { get; set; }

        [JsonPropertyName("annotations")]
        public List<int> Annotations { get; set; }
    }
}